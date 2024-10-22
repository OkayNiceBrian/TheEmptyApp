import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { apiHost } from "config/host";
import "styles/CreateForm.css";

const CreateArtist = () => {
    const { token, email, logout } = useAuth();

    const [name, setName] = useState("");
    const [id, setId] = useState(null);
    
    const [isCreated, setIsCreated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isCreated) {
            navigate("/artist/" + id);
        }
    }, [isCreated, id, navigate]);

    const onClickSubmit = () => {
        const artist = {
            name: name,
            email: email
        };
        const url = apiHost + "/artists";
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(artist)
        }).then(rsp => {
            if (rsp.status === 401) logout();
            return rsp.json();
        })
        .then(data => {
            if (data.id != null) {
                setId(data.id)
                setIsCreated(true);
            }
        }).catch(e => console.error(e));
    }

    return (
        <div className="form-container">
            <p className="form-header">Create New Artist</p>
            <div className="input-container">
                <p className="label-text">Artist Name: </p>
                <input name="artistName" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="input-container">
                <button style={{display: name !== "" ? "unset" : "none"}} onClick={onClickSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default CreateArtist;