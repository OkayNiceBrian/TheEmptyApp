import { apiHost, blobUrl } from "src/config/global";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "src/styles/CreateForm.css";

const CreateAlbum = () => {
    const { artistId } = useParams();

    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [coverFile, setCoverFile] = useState("");
    const [coverGuid, setCoverGuid] = useState("");

    const [hasCoverUploaded, setHasCoverUploaded] = useState(false);

    useEffect(() => {
        if (hasCoverUploaded) {

        }
    }, [hasCoverUploaded]);

    const getTodaysDate = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split("T")[0];
    }

    const uploadAlbumCover = async () => {
        try {
            const apiUrl = apiHost + "/files/images";
            let imageData = new FormData();
            imageData.append("name", coverFile.name);
            imageData.append("file", coverFile);
            await fetch(apiUrl, {
                method: "POST",
                body: imageData
            }).then(rsp => rsp.json())
            .then(data => {
                setCoverGuid(data.guid);
                setHasCoverUploaded(true);
            });
        } catch (e) {
            console.error(e);
        }
    }

    const onClickSubmit = async () => {
        try {
            await uploadAlbumCover();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div class="container">
            <div class="input-container">
                <p class="field-text">Album Title</p>
                <input value={title} onChange={e => {setTitle(e.target.value)}}></input>
            </div>
            <div class="input-container">
                <p class="field-text">Release Date</p>
                <input type="date" value={releaseDate} max={getTodaysDate()} onChange={e => setReleaseDate(e.target.value)}/>
            </div>
            <div class="input-container">
                <p class="field-text">Album Cover</p>
                {hasCoverUploaded ? (
                    <img src={blobUrl + "/" + coverGuid} alt="Album Cover"/>
                ) : null}
                <input type="file" onChange={e => setCoverFile(e.target.files[0])} style={{display: "flex"}}/>
            </div>
            <div class="input-container">
                <button onClick={onClickSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default CreateAlbum;