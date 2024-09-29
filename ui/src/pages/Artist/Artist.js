import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiHost, blobUrl } from "src/config/host";
import "src/styles/Artist.css";

const Artist = () => {
    const { artistId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState(null);

    const [isDeleted, setIsDeleted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const url = apiHost + "/artists/" + artistId;
                await fetch(url, {
                    method: "GET"
                })
                .then((response) => response.json())
                .then((data) => {
                    setArtist(data)
                    setIsLoading(false);
                });
            } catch (e) {
                console.error(e);
            }
        }

        if (isLoading) {
            fetchArtist();
        }
    }, [artistId, isLoading]);

    useEffect(() => {
        if (isDeleted) {
            navigate("/");
        }
    }, [isDeleted, navigate])

    const renderAlbums = () => {
        return artist.albums.map(album => 
            <div className="album-container">
                <div className="album-header-container">
                    <p className="album-header-text">{album.name}</p>
                    <img className="album-cover" src={blobUrl + "/" + album.coverImageGuid} alt={album.name}/>
                    <button onClick={() => onClickDeleteAlbum(album.id)}>DELETE Album</button>
                </div>
                <div className="songs-container">
                    {renderSongs(album)}
                </div>
            </div>
        );
    }

    const renderSongs = (album) => {
        return album.songs.map(song => 
            <div className="song-container">
                <p className="song-text">{song.name}</p>
            </div>
        );
    }

    const onClickDelete = async () => {
        try {
            const url = apiHost + "/artists/" + artistId;
            await fetch(url, {
                method: "DELETE"
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
                method: "DELETE"
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

    if (isLoading) return <div className="container" />;

    return (
        <div className="artist-container">
            <div className="header-container">
                <p className="header-text">{artist.name}</p>
                <button onClick={() => navigate(`/artist/${artistId}/create/album`)}>CREATE NEW Album</button>
                <button onClick={onClickDelete}>DELETE Artist</button>
            </div>
            {renderAlbums()}
        </div>
    );
};

export default Artist;