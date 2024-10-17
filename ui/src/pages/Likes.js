import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { useAudio } from "contexts/AudioPlayerContext";
import { PlayCircle02Icon, Queue02Icon, StarCircleIcon } from "hugeicons-react";
import { apiHost } from "config/host";
import "styles/Likes.css";

const Likes = () => {
    const { token, logout } = useAuth();
    const { queueSong, playSong} = useAudio();

    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState();

    useEffect(() => {
        if (loading) {
            const url = `${apiHost}/songs/likes`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(rsp => {
                if (rsp.status === 401) logout();
                return rsp.json();
            }).then(data => {
                setSongs(data);
                console.log(data);
                setLoading(false);
            }).catch(e => console.error(e));
        }
    });

    const renderSongs = () => {
        return <ul className="likes-songs-container">
            {songs.map((song, index) => {
                return <li key={song.id} className="likes-song-container-grid" style={{borderTopWidth: index === 0 ? "1px" : 0}}>
                    <p className="likes-song-text">{index + 1}</p>
                    <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} onClick={() => playSong({artistName: song.artistName, albumName: song.albumName, songName: song.name, guid: song.audioFileGuid, coverImageGuid: song.coverImageGuid})}/>
                    <p className="likes-song-title-text">{song.name}</p>
                    <p className="likes-song-text">{song.albumName}</p>
                    <p className="likes-song-text">{song.artistName}</p>
                    <StarCircleIcon color={"yellow"} size={"20px"}/>
                    <p className="likes-song-text">3:23</p>
                    <p className="likes-song-text">Plays: {song.listens}</p>
                    <Queue02Icon className={"clickable-icon"} color={"green"} size={"20px"} onClick={() => queueSong({artistName: song.artistName, albumName: song.albumName, songName: song.name, guid: song.audioFileGuid, coverImageGuid: song.coverImageGuid})}/>
                </li>
            })}
        </ul>
    }

    if (loading) return (
        <div className="likes-container">
            loading...
        </div>
    )

    return (
        <div className="likes-container">
            <div className="likes-header-container">
                <p>Liked Songs</p>
            </div>
            {renderSongs()}
        </div>
    );
}

export default Likes;