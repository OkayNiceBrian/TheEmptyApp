import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Delete04Icon, AddCircleIcon} from "hugeicons-react";
import Loading from "components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/rootReducer";
import { apiHost, blobUrl } from "config/host";
import "styles/Artist.css";

const Artist = () => {
    const { artistId } = useParams();

    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const userArtistId = useSelector(state => state.userArtistId);

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
            .then((rsp) => {
                if (rsp.status === 401) dispatch(logout());
                return rsp.json();
            })
            .then((data) => {
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

    useEffect(() => {
        // TODO: something happens when artistId changes
    }, [artistId]);

    const onClickAlbum = (id) => {
        navigate(`/artist/${artistId}/album/${id}`);
    }

    const renderAlbums = () => {
        return artist.albums.map(album => 
            <div onClick={() => onClickAlbum(album.id)} key={album.id} className="artist-album-container">
                <img className="artist-album-cover" src={blobUrl + "/" + album.coverImageGuid} alt={album.name}/>
                <p className="artist-album-header-text">{album.name}</p>
                <p className="artist-album-subheader-text">{album.releaseDate}</p>
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
                if (rsp.status === 401) dispatch(logout());
                if (rsp.status === 204) setIsDeleted(true);
            });
        } catch (e) {
            console.error(e);
        }
    }
    
    if (isLoading) return <Loading/>

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
            {userArtistId == artistId ? <AddCircleIcon className="clickable-icon" color={"green"} size={"40px"} onClick={() => navigate(`/artist/${artistId}/album/create`)} style={{marginBottom: "100px"}}/> : null}
        </div>
    );
};

export default Artist;