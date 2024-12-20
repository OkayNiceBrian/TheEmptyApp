import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading";
import CreateSong from "./components/CreateSong";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/rootReducer";
import { apiHost, blobUrl } from "config/host";
import { getTodaysDate, parseEmails } from "helpers/Util";
import "styles/CreateForm.css";

const CreateAlbum = () => {
    const { artistId } = useParams();

    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const userArtistId = useSelector(state => state.userArtistId);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [genres, setGenres] = useState([]);
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [coverFile, setCoverFile] = useState("");
    const [coverGuid, setCoverGuid] = useState("");
    const [primaryGenre, setPrimaryGenre] = useState("");
    const [secondaryGenre, setSecondaryGenre] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [allowedEmailsString, setAllowedEmailsString] = useState("");
    const [areFieldsFilled, setAreFieldsFilled] = useState(false);
    const [albumId, setAlbumId] = useState(0);

    const [songComponents, setSongComponents] = useState([]);

    const [hasCoverUploaded, setHasCoverUploaded] = useState(false);
    const [isAlbumCreated, setIsAlbumCreated] = useState(false);
    const [areSongsUploading, setAreSongsUploading] = useState(false);
    const uploadTotal = songComponents.length * 2 + 2;

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            const url = apiHost + "/albums/genres";
            fetch(url, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            }).then(rsp => {
                if (rsp.status === 401) dispatch(logout());
                return rsp.json();
            }).then(data => {
                setGenres(data);
                setLoading(false);
            }).catch(e => console.error(e));
        }
    })

    useEffect(() => {
        if (title !== "" && releaseDate !== "" && coverFile !== "" && primaryGenre !== "" && songComponents.length > 0) {
            setAreFieldsFilled(true);
            for (let i = 0; i < songComponents.length; i++) {
                const s = songComponents[i];
                if (s.name === "" || s.trackNum === 0 || s.file.name == null) {
                    setAreFieldsFilled(false);
                    break;
                }
            }
        }
    }, [title, releaseDate, coverFile, songComponents, primaryGenre]);

    useEffect(() => {
        if (isAlbumCreated) {
            setUploading(false);
            navigate("/artist/" + artistId);
        }
    }, [isAlbumCreated, artistId, navigate]);

    useEffect(() => {
        const uploadSongs = async () => {
            const audioUrl = apiHost + "/files/audio";
            const songUrl = apiHost + "/songs";
            for (let i = 0; i < songComponents.length; i++) {
                const songComponent = songComponents[i];
                let audioData = new FormData();
                audioData.append("file", songComponent.file);
                await fetch(audioUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                    },
                    body: audioData
                }).then(rsp => {
                    if (rsp.status === 401) dispatch(logout());
                    return rsp.json();
                })
                .then(data => {
                    const song = {
                        name: songComponent.name,
                        artistId: parseInt(artistId),
                        albumId: parseInt(albumId),
                        trackNum: parseInt(songComponent.trackNum),
                        duration: parseFloat(songComponent.duration),
                        audioFileGuid: data.guid
                    };
                    setUploadProgress(prev => prev + 1);
                    fetch(songUrl, {
                        method: "POST",
                        headers: {
                            "Accept": "applicatin/json",
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token,
                        },
                        body: JSON.stringify(song)
                    }).then(rsp => {
                        if (i === songComponents.length - 1) {
                            setIsAlbumCreated(true);
                        }
                        setUploadProgress(prev => prev + 1);
                    });
                })
            }
        }

        if (areSongsUploading) {
            try {
                uploadSongs();
            } catch(e) {
                console.error(e);
            }
        }
    }, [areSongsUploading, songComponents, albumId, artistId, token, setIsAlbumCreated])

    const addSongToCreate = () => {
        setSongComponents(prev => [...prev, {artistId: artistId, name: "", trackNum: 0, file: {}}]);
    }

    const uploadAlbumCoverThenAlbum = async () => {
        const imagesUrl = apiHost + "/files/images";
        let imageData = new FormData();
        imageData.append("name", coverFile.name);
        imageData.append("file", coverFile);
        await fetch(imagesUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
            },
            body: imageData
        }).then(rsp => {
            if (rsp.status === 401) dispatch(logout());
            if (rsp.ok) setHasCoverUploaded(true);
            setUploadProgress(prev => prev + 1);
            return rsp.json();
        }).then(data => {
            setCoverGuid(data.guid);
            const albumsUrl = apiHost + "/albums";
            fetch(albumsUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    name: title,
                    artistId: parseInt(artistId),
                    releaseDate: releaseDate,
                    primaryGenre: primaryGenre,
                    secondaryGenre: secondaryGenre,
                    isPrivate: isPrivate,
                    allowedEmails: parseEmails(allowedEmailsString),
                    coverImageGuid: data.guid
                })
            }).then(rsp => {
                return rsp.json();
            }).then(data => {
                setAlbumId(data.id);
                setUploadProgress(prev => prev + 1);
                setAreSongsUploading(true);
            });
        });
    }

    const onClickSubmit = async () => {
        try {
            setUploading(true);
            await uploadAlbumCoverThenAlbum();
        } catch (e) {
            console.error(e);
        }
    }

    if (userArtistId !== artistId) {
        return <div className="form-container">
            <label className="label-text">
                You don't have access to this page.
                If you control this artist, switch your current artist in the Options page.
            </label>
        </div>
    }

    if (loading) return <Loading/>

    if (uploading) return <Loading percent={Math.floor((uploadProgress / uploadTotal) * 100)}/>

    return (
        <div className="form-container">
            <p className="form-header">Create Album</p>
            <div className="input-container">
                <label className="label-text">Album Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)}></input>
            </div>
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
                <textarea onChange={(e) => setAllowedEmailsString(e.target.value)} placeholder={`example@email.com\ntest@email.com\nhelloworld@email.com`} className="input-textBox"/>
                <label>Press enter (newline) after each email.</label>
            </div>}
            <div className="input-container">
                <label className="label-text">Songs</label>
                {songComponents.map((song, index) => <CreateSong key={index} i={index} songComponents={songComponents} setSongComponents={setSongComponents} />)}
                <button onClick={addSongToCreate}>Add Song</button>
            </div>
            { areFieldsFilled ? (
                <div className="input-container">
                    <button onClick={onClickSubmit}>Submit</button>
                </div>
            ) : null}
        </div>
    );
}

export default CreateAlbum;