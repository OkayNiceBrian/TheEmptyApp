import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading";
import EditSong from "./components/EditSong";
import { useAuth } from "contexts/AuthContext";
import { apiHost } from "config/host";
import { convertDuration, getTodaysDate, parseEmails } from "helpers/Util";
import "styles/CreateForm.css";
import { Edit02Icon } from "hugeicons-react";

const EditAlbum = () => {
    const { artistId, albumId } = useParams();
    const { token, logout } = useAuth();
    const { navigate } = useNavigate();

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [genres, setGenres] = useState([]);
    const [album, setAlbum] = useState(null);
    const [albumTitle, setAlbumTitle] = useState("");
    const [songs, setSongs] = useState([]);
    const [releaseDate, setReleaseDate] = useState({});
    const [primaryGenre, setPrimaryGenre] = useState("");
    const [secondaryGenre, setSecondaryGenre] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [allowedEmailsString, setAllowedEmailsString] = useState("");
    const [coverFile, setCoverFile] = useState({});
    const [coverGuid, setCoverGuid] = useState("");
    const [audioUpdates, setAudioUpdates] = useState([]);

    const [isAlbumEdited, setIsAlbumEdited] = useState(false);

    useEffect(() => {
        if (loading) {
            const genreUrl = `${apiHost}/albums/genres`;
            fetch(genreUrl, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            }).then(rsp => {
                if (rsp.status === 401) logout();
                return rsp.json();
            }).then(data => {
                setGenres(data);
            }).then(() => {
                const url = `${apiHost}/albums/edit/${albumId}`;
                fetch(url, {
                    method: "GET", 
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then(rsp => {
                    if (rsp.status === 401) logout();
                    return rsp.json();
                }).then(data => {
                    setAlbum(data);
                    setLoading(false);
                })
            }).catch(e => console.error(e));
        }
    });

    useEffect(() => {
        if (album !== null) {
            setAlbumTitle(album.name);
            setSongs(album.songs);
            setReleaseDate(album.releaseDate);
            setPrimaryGenre(album.primaryGenre);
            setSecondaryGenre(album.secondaryGenre);
            setIsPrivate(album.isPrivate);
            setAllowedEmailsString(album.allowedEmails.join('\n'));
        }
    }, [album])
    
    useEffect(() => {
        if (isAlbumEdited) {
            navigate("/artist/" + artistId);
        }
    }, [isAlbumEdited, artistId, navigate]);

    const renderSongs = () => {
        return (
            <ul>
                {songs.map(song => <li key={song.id}>{song.trackNum}. ({convertDuration(song.duration)}) <Edit02Icon className="clickable-icon" color="green" onClick={() => clickEditSong(song)}/> {song.name}
                    
                </li>)}
            </ul>
        )
    }
    
    const clickEditSong = (song) => {
        if (!audioUpdates.map(a => a.song.name).includes(song.name)) {
            setAudioUpdates(prev => [...prev, {file: {}, song: song}]);
        }
    }

    const renderSongComponents = () => {
        return audioUpdates.map((audio, index) => <EditSong key={index} song={audio.song} audioUpdates={audioUpdates} setAudioUpdates={setAudioUpdates} />)
    }

    const pressSubmit = () => {
        const url = `${apiHost}/albums/${albumId}`;
        const a = {
            name: albumTitle,
            releaseDate: releaseDate,
            primaryGenre: primaryGenre,
            secondaryGenre: secondaryGenre,
            isPrivate: isPrivate,
            allowedEmails: parseEmails(allowedEmailsString),
            coverImageGuid: coverGuid
        };
        fetch(url, {
            method: "PUT",
            headers: {
                "Accepts": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(a)
        }).then(rsp => {
            
        }).catch(e => console.error(e));
    }

    if (loading || uploading) return <Loading/>;

    return (
        <div className="form-container">
            <p className="form-header">Edit Album "{albumTitle}"</p>
            <div className="input-container">
                <label className="label-text">Album Title</label>
                <input value={albumTitle} onChange={e => setAlbumTitle(e.target.value)}/>
            </div>
            {renderSongs()}
            <div style={{marginLeft: "80px"}}>{renderSongComponents()}</div>
            <div className="input-container">
                <label className="label-text">Release Date</label>
                <input type="date" value={releaseDate} max={getTodaysDate()} onChange={e => setReleaseDate(e.target.value)}/>
            </div>
            <div className="input-container">
                <label className="label-text">Album Cover</label>
                <input type="file" onChange={e => setCoverFile(e.target.files[0])} style={{display: "flex"}}/>
            </div>
            <div className="input-container">
                <label className="label-text">Primary Genre</label>
                <select value={primaryGenre} onChange={e => setPrimaryGenre(e.target.value)}>
                    {genres.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
                    <option value=""></option>
                </select>
            </div>
            <div className="input-container">
                <label className="label-text">Secondary Genre</label>
                <select value={secondaryGenre} onChange={e => setSecondaryGenre(e.target.value)}>
                    {genres.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
                    <option value="">None</option>
                </select>
            </div>
            <div className="input-container" style={{flexDirection: "row", gap: "10px"}}>
                <label className="label-text">Make Private?</label>
                <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)}/>
            </div>
            {isPrivate && <div className="input-container">
                <label className="label-text">Allowed Users (If Private)</label>
                <textarea value={allowedEmailsString} onChange={(e) => setAllowedEmailsString(e.target.value)} placeholder={`example@email.com\ntest@email.com\nhelloworld@email.com`} className="input-textBox"/>
                <label>Press enter (newline) after each email.</label>
            </div>}
            {isAlbumEdited && <div className="input-container">
                <button onClick={() => pressSubmit()}>Submit</button>
            </div>}
        </div>
    );
}

export default EditAlbum;