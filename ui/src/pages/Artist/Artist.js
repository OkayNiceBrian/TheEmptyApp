import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/auth/AuthContext";
import { apiHost, blobUrl } from "src/config/host";
import "src/styles/Artist.css";

const Artist = () => {
    const { artistId } = useParams();

    const { token } = useAuth();

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
                    <p className="album-header-text">{album.name}<button onClick={() => onClickDeleteAlbum(album.id)}>E</button><button onClick={() => onClickDeleteAlbum(album.id)}>D</button></p>
                </div>
                <ul className="songs-container">
                    {renderSongs(album)}
                </ul>
            </div>
        );
    }

    const renderSongs = (album) => {
        return album.songs.map((song) => 
            <li key={song.id} className="song-container-grid">
                <p className="song-text">{song.trackNum}</p>
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
                <button onClick={() => navigate(`/artist/${artistId}/create/album`)}>CREATE NEW Album</button>
                <button onClick={onClickDelete}>DELETE Artist</button>
            </div>
            {renderAlbums()}
        </div>
    );
};

export default Artist;