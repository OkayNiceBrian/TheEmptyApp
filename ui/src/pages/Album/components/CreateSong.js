import { useEffect, useState } from "react";
import "styles/CreateForm.css";

const CreateSong = ({i, songComponents, setSongComponents}) => {
    
    const assignName = (e) => {
        setSongComponents(songComponents.map((song, index) => {
            return i === index ? Object.assign({}, song, {name: e.target.value}) : song
        }))
    }

    const assignFile = (e) => {
        setSongComponents(songComponents.map((song, index) => {
            return i === index ? Object.assign({}, song, {file: e.target.files[0], trackNum: i + 1}) : song
        }));
    }

    return (
        <div className="form-container form-container-border">
            <div className="input-container">
                <p className="label-text">{i + 1}. Song Title</p>
                <input value={songComponents[i].name} onChange={e => assignName(e)}/>
            </div>
            <div className="input-container">
                <p className="label-text">Audio File (.mp3 only)</p>
                <input type="file" onChange={e => assignFile(e)}/>
            </div>
        </div>
    );
}

export default CreateSong;