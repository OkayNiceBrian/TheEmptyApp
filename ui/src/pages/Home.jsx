import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/rootReducer";
import { apiHost, blobUrl } from "config/host";
import Loading from "components/Loading";
import backgroundImage from "assets/home-bck.png";
import "styles/Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.username);
    const token = useSelector(state => state.token);
    const userArtistId = useSelector(state => state.userArtistId);
    const [recentReleases, setRecentReleases] = useState([]);
    const [yourReleases, setYourReleases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            const url = `${apiHost}/albums/index`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(rsp => {
                if (rsp.status === 401) dispatch(logout());
                return rsp.json();
            }).then(data => {
                setRecentReleases(data);
                if (!userArtistId) setLoading(false);
            }).then(() => {
                if (userArtistId) {
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
                        setLoading(false);
                    })
                }
            }).catch(e => console.error(e))
        }
    }, [loading]);

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
        </ul>;
    }

    if (loading) return <Loading/>;
    
    return (
        <div className="home-container">
            <img src={backgroundImage} alt={"Home"} className="home-image"/>
            <div className="home-header-container">
                <p>Welcome to Empty Music, {username}.</p>
            </div>
            <div className="home-releases-container">
                <h3>Recent Releases</h3>
                {renderReleases(recentReleases)}
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