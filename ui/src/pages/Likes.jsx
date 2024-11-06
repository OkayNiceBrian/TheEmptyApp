import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/rootReducer";
import Loading from "components/Loading";
import SongList from "components/SongList";
import { apiHost } from "config/host";
import "styles/Likes.css";

const Likes = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);

    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState();

    useEffect(() => {
        if (loading) {
            const url = `${apiHost}/songs/likes`;
            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(rsp => {
                if (rsp.status === 401) dispatch(logout());
                return rsp.json();
            }).then(data => {
                setSongs(data);
                setLoading(false);
            }).catch(e => console.error(e));
        }
    });

    if (loading) return <Loading/>

    return (
        <div className="likes-container">
            <div className="likes-header-container">
                <p>Liked Songs</p>
            </div>
            <SongList songList={songs}/>
        </div>
    );
}

export default Likes;