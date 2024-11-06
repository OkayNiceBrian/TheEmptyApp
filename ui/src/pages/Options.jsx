import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUserArtistId } from "store/rootReducer";
import { apiHost } from "config/host";
import "styles/Options.css";

const Options = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const email = useSelector(state => state.email);
    const userArtistId = useSelector(state => state.userArtistId);

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
                body: JSON.stringify(email) // TODO: change to get request and check the user on the backend
            }).then(rsp => {
                if (rsp.status === 401) dispatch(logout());
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
                <select defaultValue={userArtistId} onChange={(e) => dispatch(setUserArtistId(e.target.value))}>
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