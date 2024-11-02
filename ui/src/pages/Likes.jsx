import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import Loading from "components/Loading";
import SongList from "components/SongList";
import { apiHost } from "config/host";
import "styles/Likes.css";

const Likes = () => {
    const { token, logout } = useAuth();

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
                if (rsp.status === 401) logout();
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