import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import { useAuth } from "contexts/AuthContext";
import { apiHost } from "config/host";
import "styles/Options.css";

const Options = () => {
    const { token, email, setCurrentArtist, userArtistId, logout } = useAuth();

    const [artists, setArtists] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            const url = `${apiHost}/options`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(email)
            }).then(rsp => {
                if (rsp.status === 401) logout();
                return rsp.json();
            })
            .then(data => {
                setArtists(data.artists);
                setLoading(false);
            }).catch(e => console.error(e));
        }
    })

    if (loading) return <Loading/>

    return (
        <div className="options-container">
            <div className="options-header-container">
                <h1>Options</h1>
            </div>
            <div className="options-field-container">
                <label>Set Current Artist</label>
                <select defaultValue={userArtistId} onChange={(e) => setCurrentArtist(e.target.value)}>
                    {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
            </div>
            <Link className="link" to="/artist/create"><div className="options-field-container button">
                <label>Create New Artist</label>
            </div></Link>
        </div>
    );
    
}

export default Options;