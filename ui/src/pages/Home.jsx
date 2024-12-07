import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/rootReducer";
import { apiHost, blobUrl } from "config/host";
import { setUppercaseFirstCharacter } from "helpers/Util";
import Loading from "components/Loading";
import backgroundImage from "assets/home-bck.png";
import "styles/Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.username);
    const token = useSelector(state => state.token);
    const userArtistId = useSelector(state => state.userArtistId);
    const [genres, setGenres] = useState([]);
    const [releases, setReleases] = useState([]);
    const [releasesType, setReleasesType] = useState("recent");
    const [yourReleases, setYourReleases] = useState([]);
    const [loadingReleases, setLoadingReleases] = useState(true);
    const [loadingYourReleases, setLoadingYourReleases] = useState(true);
    const [loadingGenres, setLoadingGenres] = useState(true);

    useEffect(() => {
        if (loadingGenres) {
            const url = `${apiHost}/albums/genres`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(rsp => {
                if (rsp.status === 401) dispatch(logout());
                return rsp.json();
            }).then(data => {
                setGenres(data);
                setLoadingGenres(false);
            }).catch(e => console.error(e));
        }
    }, [loadingGenres])

    useEffect(() => {
        if (loadingReleases && !loadingGenres) {
            const url = `${apiHost}/albums/index/${releasesType}`; //TODO: Backend support
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(rsp => {
                if (rsp.status === 401) dispatch(logout());
                return rsp.json();
            }).then(data => {
                setReleases(data);
                setLoadingReleases(false);
            }).catch(e => console.error(e))
        }
    }, [loadingReleases, loadingGenres, releasesType]);

    useEffect(() => {
        if (loadingYourReleases && userArtistId) {
            const artistUrl = `${apiHost}/artists/${userArtistId}`;
            fetch(artistUrl, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(rsp => {
                if (rsp.status === 401) dispatch(logout());
                return rsp.json();
            }).then(data => {
                setYourReleases(data.albums);
                setLoadingYourReleases(false);
            }).catch(e => console.error(e));
        }
    }, [loadingYourReleases])

    const renderBrowseGenres = () => {
        return <div className="home-browseGenres">
            {genres.map((genre, index) => <p key={index} onClick={() => onClickGenre(genre)}>{genre}</p>)}
        </div>
    }

    const onClickGenre = (genre) => {
        setReleasesType(genre);
        setLoadingReleases(true);
    }

    const renderReleases = (releases) => {
        return <ul className="home-releases">
            {releases.map((album) => {
                return <div key={album.id} className="home-album-container" onClick={() => navigate(`artist/${album.artistId}/album/${album.id}`)}>
                    <li>
                        <img src={`${blobUrl}/${album.coverImageGuid}`} className="home-releaseImage"/>
                        <div className="home-albumInfo">
                            <p style={{fontWeight: "bold"}}>{album.name}</p>
                            <p> by <Link to={`artist/${album.artistId}`} className="home-artistLink" onClick={(e) => e.stopPropogation()}>{album.artistName}</Link></p>
                            <p>{album.releaseDate}</p>
                            <p style={{fontWeight: "lighter"}}>{album.primaryGenre}</p>
                            <p style={{fontWeight: "lighter"}}>{album.secondaryGenre}</p>
                        </div>
                    </li>
                </div>
            })}
            {releases.length == 0 && <div>
                <h3>Nothing Yet...</h3>
                <h3>:(</h3>
            </div>}
        </ul>;
    }

    if (loadingYourReleases) return <Loading/>;
    
    return (
        <div className="home-container">
            <img src={backgroundImage} alt={"Home"} className="home-image"/>
            <div className="home-header-container">
                <p>Welcome to Empty Music, {username}.</p>
            </div>
            <div className="home-browseGenres-container">
                <h3>Browse Genres</h3>
                {renderBrowseGenres()}
            </div>
            <div className="home-releases-container">
                <h3>{setUppercaseFirstCharacter(releasesType)} Releases</h3>
                {renderReleases(releases)}
            </div>
            {userArtistId && yourReleases.length > 0 &&
            <div className="home-releases-container">
                <h3>Your Releases</h3>
                {renderReleases(yourReleases)}
            </div>
            }
        </div>
    );
}

export default Home;