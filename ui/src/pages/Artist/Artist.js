import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Delete04Icon, AddCircleIcon} from "hugeicons-react";
import { useAuth } from "contexts/AuthContext";
import { apiHost, blobUrl } from "config/host";
import "styles/Artist.css";

const Artist = () => {
    const { artistId } = useParams();

    const { token, userArtistId } = useAuth();

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

    const onClickAlbum = (id) => {
        console.log("asdf");
        navigate(`/artist/${artistId}/album/${id}`);
    }

    const renderAlbums = () => {
        return artist.albums.map(album => 
            <div onClick={() => onClickAlbum(album.id)} key={album.id} className="artist-album-container">
                <img className="artist-album-cover" src={blobUrl + "/" + album.coverImageGuid} alt={album.name}/>
                <p className="artist-album-header-text">{album.name}</p>
            </div>
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

    if (isLoading) return (
        <div className="artist-container">
            <p className="artist-header-text">loading...</p>
        </div>
    );

    return (
        <div className="artist-container">
            <div className="artist-header-container">
                <p className="artist-header-text">{artist.name}</p>
                {//userArtistId === artistId && <Delete04Icon className="clickable-icon" color={"red"} onClick={onClickDelete}/>
                }
            </div>
            <div className="artist-album-list-container">
                {renderAlbums()}
            </div>
            {userArtistId === artistId && <AddCircleIcon className="clickable-icon" color={"green"} size={"40px"} onClick={() => navigate(`/artist/${artistId}/album/create`)} style={{marginBottom: "100px"}}/>}
        </div>
    );
};

export default Artist;