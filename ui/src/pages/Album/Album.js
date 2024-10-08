import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayCircle02Icon, Edit02Icon, Delete04Icon, Queue02Icon } from "hugeicons-react";
import { useAuth } from "contexts/AuthContext";
import { useAudio } from "contexts/AudioPlayerContext";
import { apiHost, blobUrl } from "config/host";
import "styles/Album.css";

const Album = () => {
    const { artistId, albumId } = useParams();
    const { token, userArtistId } = useAuth();
    const { playSong, queueSong } = useAudio();

    const [album, setAlbum] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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

    const onClickDeleteAlbum = (albumId) => {
        const url = apiHost + "/albums/" + albumId;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(rsp => {
            if (rsp.status === 204) {
                navigate(`/artist/${artistId}`)
            };
        }).catch(e => console.error(e));
    }

    const renderAlbum = () => {
        return (
            <div className="album-container">
                <div className="album-cover-container">
                    <img className="album-cover" src={blobUrl + "/" + album.coverImageGuid} alt={album.name}/>
                    <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} size={"100px"}/>
                    <div className="album-header-items-container">
                        {userArtistId === artistId && <Edit02Icon className="clickable-icon" color={"green"} onClick={() => onClickDeleteAlbum(album.id)}/>}
                        {userArtistId === artistId && <Delete04Icon className="clickable-icon" color={"red"} onClick={() => onClickDeleteAlbum(album.id)}/>}
                    </div>
                </div> 
                <ul className="album-songs-container">
                    {renderSongs(album)}
                </ul>
            </div>
        );
    }

    const renderSongs = (album) => {
        return album.songs.map((song, index) => 
            <li key={song.id} className="album-song-container-grid" style={{borderTopWidth: index === 0 ? "1px" : 0}}>
                <p className="album-song-text">{song.trackNum}</p>
                <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} onClick={() => playSong({artistName: "somthin", albumName: album.name, songName: song.name, guid: song.audioFileGuid, coverImageGuid: album.coverImageGuid})}/>
                <p className="album-song-title-text">{song.name}</p>
                <p className="album-song-text">{album.name}</p>
                <p className="album-song-text">{/*artist.name*/}</p>
                <p className="album-song-text">3:23</p>
                <Queue02Icon className={"clickable-icon"} color={"green"} size={"20px"} onClick={() => queueSong({artistName: "somethin", albumName: album.name, songName: song.name, guid: song.audioFileGuid, coverImageGuid: album.coverImageGuid})}/>
            </li>
        );
    }

    if (loading) return (
        <div className="album-body">
            <p className="album-header-text">loading...</p>
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