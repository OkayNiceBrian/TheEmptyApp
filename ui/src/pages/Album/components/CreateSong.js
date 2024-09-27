import { useState } from "react";
import "src/styles/CreateForm.css";

const CreateSong = ({artistId, trackNum}) => {
    const [name, setName] = useState("");
    const [songFile, setSongFile] = useState("");

    return (
        <div class="container">
            <div class="input-container">
                <p class="field-text">{trackNum}. Song Title</p>
                <input value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div class="input-container">
                <p class="field-text">Upload Song (.mp3 only)</p>
                <input type="file" onChange={e => setSongFile(e.target.files[0])}/>
            </div>
        </div>
    );
}

export default CreateSong;