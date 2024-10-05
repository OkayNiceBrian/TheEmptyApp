import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Delete04Icon, Edit02Icon, AddCircleIcon, PlayCircle02Icon } from "hugeicons-react";
import { useAuth } from "auth/AuthContext";
import { useAudio } from "contexts/AudioPlayerContext";
import { apiHost, blobUrl } from "config/host";
import "styles/Artist.css";

const Artist = () => {
    const { artistId } = useParams();

    const { token } = useAuth();
    const queueSong = useAudio();

    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(null);

    const [isDeleted, setIsDeleted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtist = () => {
            const url = apiHost + "/artists/" + artistId;
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArtist(data);
                setIsLoading(false);
            }).catch(e => console.error(e));
        }

        if (isLoading) {
            fetchArtist();
        }
    }, [artistId, isLoading, token]);

    useEffect(() => {
        if (isDeleted) {
            navigate("/");
        }
    }, [isDeleted, navigate])

    const renderAlbums = () => {
        return artist.albums.map(album => 
            <div key={album.id} className="album-container">
                <div className="album-header-container">
                    <img className="album-cover" src={blobUrl + "/" + album.coverImageGuid} alt={album.name}/>
                    {//<p className="album-header-text">{album.name}</p>
                    }
                    <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} size={"100px"}/>
                    <div className="album-header-items-container">
                        <Edit02Icon className="clickable-icon" color={"green"} onClick={() => onClickDeleteAlbum(album.id)}/>
                        <Delete04Icon className="clickable-icon" color={"red"} onClick={() => onClickDeleteAlbum(album.id)}/>
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
                <PlayCircle02Icon className={"clickable-icon"} color={"cornflowerblue"} onClick={() => queueSong(song.audioFileGuid)}/>
                <p className="song-title-text">{song.name}</p>
                <p className="song-text">{album.name}</p>
                <p className="song-text">{artist.name}</p>
                <p className="song-text">3:23</p>
            </li>
        );
    }

    const onClickDelete = async () => {
        try {
            const url = apiHost + "/artists/" + artistId;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(rsp => {
                if (rsp.status === 204) setIsDeleted(true);
            });
        } catch (e) {
            console.error(e);
        }
    }

    const onClickDeleteAlbum = async (albumId) => {
        try {
            const url = apiHost + "/albums/" + albumId;
            await fetch(url, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(rsp => {
                if (rsp.status === 204) {
                    artist.albums = artist.albums.filter(album => album.id !== albumId);
                    setArtist(artist);
                    setIsLoading(true);
                };
            })
        } catch (e) {
            console.error(e);
        }
    }

    if (isLoading) return (
        <div className="container">
            <p className="header-text">loading...</p>
        </div>
    );

    return (
        <div className="artist-container">
            <div className="artist-header-container">
                <p className="artist-header-text">{artist.name}</p>
                <Delete04Icon className="clickable-icon" color={"red"} onClick={onClickDelete}/>
            </div>
            {renderAlbums()}
            <AddCircleIcon className="clickable-icon" color={"green"} size={"40px"} onClick={() => navigate(`/artist/${artistId}/create/album`)} style={{marginBottom: "100px"}}/>
        </div>
    );
};

export default Artist;