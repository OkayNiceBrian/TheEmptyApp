import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PlayCircle02Icon, Edit02Icon, Delete04Icon } from "hugeicons-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/rootReducer";
import { useAudio } from "contexts/AudioPlayerContext";
import Loading from "components/Loading";
import SongList from "components/SongList";
import { apiHost, blobUrl } from "config/host";
import { convertSongInfo } from "helpers/Util";
import "styles/Album.css";

const Album = () => {
    const { artistId, albumId } = useParams();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const userArtistId = useSelector(state => state.userArtistId);
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
                if (rsp.status === 401) navigate("*");
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
            if (rsp.status === 401) dispatch(logout());
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
                    <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} size={"170px"} onClick={() => onClickPlayAlbum(album)}/>
                    <div className="album-header-items-container">
                        {userArtistId === artistId && <Edit02Icon className="clickable-icon" color={"green"} onClick={() => navigate(`edit`)}/>}
                        {userArtistId === artistId && <Delete04Icon className="clickable-icon" color={"red"} onClick={onClickDeleteAlbum}/>}
                    </div>
                </div> 
                <SongList songList={album.songs}/>
            </div>
        );
    }

    if (loading) return <Loading/>;

    return (
        <div className="album-body">
            <div className="album-header-container">
                <p className="album-header-text">{album.name} by <Link to={`../artist/${album.artistId}`} className="album-artistLink">{album.artistName}</Link></p>
            </div>
            {renderAlbum()}
        </div>
    );
}

export default Album;