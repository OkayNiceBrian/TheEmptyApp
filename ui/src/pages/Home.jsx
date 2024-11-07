import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/rootReducer";
import { apiHost } from "config/host";
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
        return <ul>
            {recentReleases.map((album) => {
                return <li>

                </li>;
            })}
        </ul>;
    }

    if (loading) return <Loading/>;
    
    return (
        <div className="home-container">
            <img src={backgroundImage} alt={"Home"} className="home-image"/>
            <p className="home-header">Welcome to Empty Music,</p>
            <p className="home-body">{username}!</p>
        </div>
    );
}

export default Home;