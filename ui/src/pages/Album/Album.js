import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayCircle02Icon, Edit02Icon, Delete04Icon, Queue02Icon } from "hugeicons-react";
import { useAuth } from "contexts/AuthContext";
import { useAudio } from "contexts/AudioPlayerContext";
import { apiHost, blobUrl } from "config/host";
import "styles/Album.css";

const Album = () => {
    const { albumId } = useParams();
    const { token, userArtistId } = useAuth();
    const { playSong, queueSong } = useAudio();

    const [album, setAlbum] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            const url = apiHost + "/albums/" + albumId;
            fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }).then(rsp => rsp.json())
            .then(data => {
                setAlbum(data);
                setLoading(false);
            }).catch((e) => console.error(e));
        }
    })

    const onClickDeleteAlbum = () => {

    }

    const renderAlbum = () => {
        return (
            <div className="album-container">
                <div className="album-header-container">
                    <img className="album-cover" src={blobUrl + "/" + album.coverImageGuid} alt={album.name}/>
                    <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} size={"100px"}/>
                    <div className="album-header-items-container">
                        {userArtistId === album.artistId && <Edit02Icon className="clickable-icon" color={"green"} onClick={() => onClickDeleteAlbum(album.id)}/>}
                        {userArtistId === album.artistId && <Delete04Icon className="clickable-icon" color={"red"} onClick={() => onClickDeleteAlbum(album.id)}/>}
                    </div>
                </div> 
                <ul className="songs-container">
                    {renderSongs(album)}
                </ul>
            </div>
        );
    }

    const renderSongs = (album) => {
        return album.songs.map((song, index) => 
            <li key={song.id} className="song-container-grid" style={{borderTopWidth: index === 0 ? "1px" : 0}}>
                <p className="song-text">{song.trackNum}</p>
                <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} onClick={() => playSong({artistName: "somthin", albumName: album.name, songName: song.name, guid: song.audioFileGuid, coverImageGuid: album.coverImageGuid})}/>
                <p className="song-title-text">{song.name}</p>
                <p className="song-text">{album.name}</p>
                <p className="song-text">{/*artist.name*/}</p>
                <p className="song-text">3:23</p>
                <Queue02Icon className={"clickable-icon"} color={"green"} size={"20px"} onClick={() => queueSong({artistName: "somethin", albumName: album.name, songName: song.name, guid: song.audioFileGuid, coverImageGuid: album.coverImageGuid})}/>
            </li>
        );
    }

    if (loading) return (
        <div className="album-container">
            <p className="header-text">loading...</p>
        </div>
    );

    return (
        <div className="album-body">
            <div className="album-header-container">
                <p className="album-header-text">{album.name}</p>
            </div>
            {renderAlbum()}
        </div>
    );
}

export default Album;