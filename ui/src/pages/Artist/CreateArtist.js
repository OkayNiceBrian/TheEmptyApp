import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiHost } from "src/config/host";
import "src/styles/CreateForm.css";

const CreateArtist = () => {

    const [name, setName] = useState("");
    const [id, setId] = useState(null);
    
    const [isCreated, setIsCreated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isCreated) {
            navigate("/artist/" + id);
        }
    }, [isCreated, id, navigate]);

    const onClickSubmit = async () => {
        try {
            let artist = {
                name: name
            };
            console.log(artist);
            const url = apiHost + "/artists";
            await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(artist)
            }).then(rsp => rsp.json())
            .then(data => {
                setId(data.id)
                setIsCreated(true);
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div class="form-container">
            <div class="input-container">
                <p class="field-text">Artist Name: </p>
                <input name="artistName" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div class="input-container">
                <button onClick={onClickSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default CreateArtist;