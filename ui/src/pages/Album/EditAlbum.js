import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "components/Loading";
import { useAuth } from "contexts/AuthContext";
import { apiHost } from "config/host";
import { convertDuration } from "helpers/Util";
import "styles/CreateForm.css";

const EditAlbum = () => {
    const { artistId, albumId } = useParams();
    const { token, logout } = useAuth();
    const { navigate } = useNavigate();

    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState();
    const [albumTitle, setAlbumTitle] = useState("");
    const [songs, setSongs] = useState([]);

    const [isAlbumEdited, setIsAlbumEdited] = useState(false);

    useEffect(() => {
        if (loading) {
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
                setAlbumTitle(data.name);
                setSongs(data.songs);
                setLoading(false);
            }).catch(e => console.error(e));
        }
    });

    // useEffect(() => {
    //     if (title !== "" && releaseDate !== "" && coverFile !== "" && primaryGenre !== "" && songComponents.length > 0) {
    //         setAreFieldsFilled(true);
    //         for (let i = 0; i < songComponents.length; i++) {
    //             const s = songComponents[i];
    //             if (s.name === "" || s.trackNum === 0 || s.file.name == null) {
    //                 setAreFieldsFilled(false);
    //                 break;
    //             }
    //         }
    //     }
    // }, [title, releaseDate, coverFile, songComponents, primaryGenre]);

    
    useEffect(() => {
        if (isAlbumEdited) {
            navigate("/artist/" + artistId);
        }
    }, [isAlbumEdited, artistId, navigate]);

    const renderSongs = () => {
        return (
            <ul>
                {songs.map(song => <li>{song.trackNum}. ({convertDuration(song.duration)}) {song.name}</li>)}
            </ul>
        )
    }

    const pressSubmit = () => {
        const url = `${apiHost}/albums/${albumId}`;
        const a = {};
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

    if (loading) return <Loading/>;

    return (
        <div className="form-container">
            <p className="form-header">Edit Album "{albumTitle}"</p>
            <div className="input-container">
                <label className="label-text">Album Title</label>
                <input value={albumTitle} onChange={e => setAlbumTitle(e.target.value)}/>
            </div>
            {renderSongs()}
        </div>
    );
}

export default EditAlbum;