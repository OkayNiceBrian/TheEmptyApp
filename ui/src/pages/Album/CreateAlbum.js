import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiHost, blobUrl } from "src/config/host";
import "src/styles/CreateForm.css";

const CreateAlbum = () => {
    const { artistId } = useParams();

    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [coverFile, setCoverFile] = useState("");
    const [coverGuid, setCoverGuid] = useState("");
    const [areFieldsFilled, setAreFieldsFilled] = useState(false);

    const [hasCoverUploaded, setHasCoverUploaded] = useState(false);
    const [isAlbumUploading, setIsAlbumUploading] = useState(false);
    const [isAlbumCreated, setIsAlbumCreated] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (title !== "" && releaseDate !== "" && coverFile !== "") {
            setAreFieldsFilled(true);
        }
    }, [title, releaseDate, coverFile]);

    useEffect(() => {
        if (isAlbumCreated) {
            navigate("/artist/" + artistId);
        }
    }, [isAlbumCreated, artistId, navigate]);

    useEffect(() => {
        const createAlbum = () => {
            const apiUrl = apiHost + "/albums";
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: title,
                    artistId: parseInt(artistId),
                    releaseDate: releaseDate,
                    coverImageGuid: coverGuid
                })
            }).then(rsp => {
                if (rsp.ok) setIsAlbumCreated(true);
                setIsAlbumUploading(false);
            });
        }

        if (isAlbumUploading) {
            try {
                createAlbum();
            } catch (e) {
                console.error(e);
            } finally {
                setIsAlbumUploading(false);
            }
        }
        
    }, [isAlbumUploading, artistId, coverGuid, releaseDate, title])

    const getTodaysDate = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split("T")[0];
    }

    const uploadAlbumCoverThenAlbum = () => {
        const apiUrl = apiHost + "/files/images";
        let imageData = new FormData();
        imageData.append("name", coverFile.name);
        imageData.append("file", coverFile);
        fetch(apiUrl, {
            method: "POST",
            body: imageData
        }).then(rsp => {
            if (rsp.ok) setHasCoverUploaded(true);
            return rsp.json();
        }).then(data => {
            setCoverGuid(data.guid);
            setIsAlbumUploading(true); // Trigger album upload
        });
    }

    const onClickSubmit = () => {
        try {
            uploadAlbumCoverThenAlbum();
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
                    <img class="image-thumbnail" src={blobUrl + "/" + coverGuid} alt="Album Cover"/>
                ) : null}
                <input type="file" onChange={e => setCoverFile(e.target.files[0])} style={{display: "flex"}}/>
            </div>
            { areFieldsFilled ? (
                <div class="input-container">
                    <button onClick={onClickSubmit}>Submit</button>
                </div>
            ) : null}
        </div>
    );
}

export default CreateAlbum;