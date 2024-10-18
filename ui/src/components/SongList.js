import { useEffect, useState } from "react";
import { PlayCircle02Icon, Queue02Icon, StarIcon, StarCircleIcon } from "hugeicons-react";
import { useAuth } from "contexts/AuthContext";
import { useAudio } from "contexts/AudioPlayerContext";
import { convertDuration } from "helpers/Util";
import { apiHost } from "config/host";
import { convertSongInfo } from "helpers/Util";
import "styles/SongList.css";

const SongList = ({ songList }) => {
    const { token, logout } = useAuth();
    const { playSong, queueSong } = useAudio();

    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState();

    useEffect(() => {
        if (loading) {
            setSongs(songList);
            setLoading(false);
        }
    }, [loading, songList, setSongs]);

    const likeSong = (song) => {
        const url = `${apiHost}/songs/like/${song.id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(rsp => {
            if (rsp === 401) logout();
            return rsp.json();
        }).then(data => {
            setSongs(songs.map((s) => s.id === song.id ? data : s));
        }).catch(e => console.error(e));
    }

    if (loading) return ( 
        <div className="songlist-songs-container">
            <li className="songlist-song-container-grid"></li>
        </div>
    );

    return (
        <ul className="songlist-songs-container">
            {songs.map((song, index) => 
                <li key={song.id} className="songlist-song-container-grid" style={{borderTopWidth: index === 0 ? "1px" : 0}}>
                    <p className="songlist-song-text">{index + 1}</p>
                    <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} onClick={() => playSong(convertSongInfo(song))}/>
                    <p className="songlist-song-title-text">{song.name}</p>
                    <p className="songlist-song-text">{song.albumName}</p>
                    <p className="songlist-song-text">{song.artistName}</p>
                    {!song.isLikedByUser ? <StarIcon className={"clickable-icon"} color={"white"} size={"20px"} onClick={() => likeSong(song)}/> : <StarCircleIcon color={"yellow"} size={"20px"}/>}
                    <p className="songlist-song-text">{convertDuration(song.duration)}</p>
                    <p className="songlist-song-text">Plays: {song.listens}</p>
                    <Queue02Icon className={"clickable-icon"} color={"green"} size={"20px"} onClick={() => queueSong(convertSongInfo(song))}/>
                </li>
            )}
        </ul>
    );
}

export default SongList;