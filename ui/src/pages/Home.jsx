import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/rootReducer";
import { apiHost, blobUrl } from "config/host";
import Loading from "components/Loading";
import backgroundImage from "assets/home-bck.png";
import "styles/Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const username = useSelector(state => state.username);
    const token = useSelector(state => state.token);
    const [recentReleases, setRecentReleases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
            setLoading(false);
        }).catch(e => console.error(e));
    }, [loading]);

    const renderReleases = () => {
        return <ul className="home-releases">
            {recentReleases.map((album) => {
                return <Link key={album.id} className="link" to={`artist/${album.artistId}/album/${album.id}`}>
                    <li>
                        <img src={`${blobUrl}/${album.coverImageGuid}`} className="home-releaseImage"/>
                        <p>{album.name} by <Link to={`artist/${album.artistId}`} className="home-artistLink">{album.artistName}</Link></p>
                        <p>{album.releaseDate}</p>
                    </li>
                </Link>
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
                {renderReleases()}
            </div>
            
        </div>
    );
}

export default Home;