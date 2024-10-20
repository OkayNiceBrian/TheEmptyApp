import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayCircle02Icon, Edit02Icon, Delete04Icon } from "hugeicons-react";
import { useAuth } from "contexts/AuthContext";
import { useAudio } from "contexts/AudioPlayerContext";
import SongList from "components/SongList";
import { apiHost, blobUrl } from "config/host";
import { convertSongInfo } from "helpers/Util";
import "styles/Album.css";

const Album = () => {
    const { artistId, albumId } = useParams();
    const { token, userArtistId, logout } = useAuth();
    const { playAlbum } = useAudio();

    const [album, setAlbum] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            const url = `${apiHost}/albums/${albumId}`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(rsp => {
                if (rsp.status === 401) logout();
                return rsp.json();
            }).then(data => {
                setAlbum(data);
                setLoading(false);
            }).catch(e => console.error(e));
        }
    })

    const onClickDeleteAlbum = () => {
        const url = `${apiHost}/albums/${albumId}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(rsp => {
            if (rsp.status === 401) logout();
            if (rsp.status === 204) navigate(`/artist/${artistId}`);
        }).catch(e => console.error(e));
    }

    const onClickPlayAlbum = (album) => {
        const songList = album.songs.map(song => convertSongInfo(song));
        playAlbum(songList);
    }

    const renderAlbum = () => {
        return (
            <div className="album-container">
                <div className="album-cover-container">
                    <img className="album-cover" src={blobUrl + "/" + album.coverImageGuid} alt={album.name}/>
                    <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} size={"100px"} onClick={() => onClickPlayAlbum(album)}/>
                    <div className="album-header-items-container">
                        {userArtistId === artistId && <Edit02Icon className="clickable-icon" color={"green"} onClick={navigate(`artist/${artistId}/album/${albumId}/edit`)}/>}
                        {userArtistId === artistId && <Delete04Icon className="clickable-icon" color={"red"} onClick={onClickDeleteAlbum}/>}
                    </div>
                </div> 
                <SongList songList={album.songs}/>
            </div>
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
                <p className="album-header-text">{album.name} - {album.artistName}</p>
            </div>
            {renderAlbum()}
        </div>
    );
}

export default Album;