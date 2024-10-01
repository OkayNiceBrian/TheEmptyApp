import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateSong from "./components/CreateSong";
import { useAuth } from "src/auth/AuthContext";
import { apiHost, blobUrl } from "src/config/host";
import "src/styles/CreateForm.css";

const CreateAlbum = () => {
    const { artistId } = useParams();

    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [coverFile, setCoverFile] = useState("");
    const [coverGuid, setCoverGuid] = useState("");
    const [areFieldsFilled, setAreFieldsFilled] = useState(false);
    const [albumId, setAlbumId] = useState(0);

    const [songComponents, setSongComponents] = useState([]);

    const [hasCoverUploaded, setHasCoverUploaded] = useState(false);
    const [isAlbumCreated, setIsAlbumCreated] = useState(false);
    const [areSongsUploading, setAreSongsUploading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (title !== "" && releaseDate !== "" && coverFile !== "") {
            setAreFieldsFilled(true);
            for (let i = 0; i < songComponents.length; i++) {
                const s = songComponents[i];
                if (s.name === "" || s.trackNum === 0 || s.file == {}) {
                    setAreFieldsFilled(false);
                    break;
                }
            }
        }
    }, [title, releaseDate, coverFile, songComponents]);

    useEffect(() => {
        if (isAlbumCreated) {
            navigate("/artist/" + artistId);
        }
    }, [isAlbumCreated, artistId, navigate]);

    useEffect(() => {
        const uploadSongs = async () => {
            const audioUrl = apiHost + "/files/audio";
            const songUrl = apiHost + "/songs";
            for (let i = 0; i < songComponents.length; i++) {
                const songComponent = songComponents[i];
                let audioData = new FormData();
                audioData.append("file", songComponent.file);
                await fetch(audioUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                    },
                    body: audioData
                }).then(rsp => rsp.json())
                .then(data => {
                    const song = {
                        name: songComponent.name,
                        artistId: parseInt(artistId),
                        albumId: parseInt(albumId),
                        trackNum: parseInt(songComponent.trackNum),
                        audioFileGuid: data.guid
                    };
                    console.log(song);
                    fetch(songUrl, {
                        method: "POST",
                        headers: {
                            "Accept": "applicatin/json",
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token,
                        },
                        body: JSON.stringify(song)
                    }).then(rsp => {
                        if (i === songComponents.length - 1) {
                            setIsAlbumCreated(true);
                        }
                    })
                })
            }
        }

        if (areSongsUploading) {
            try {
                uploadSongs();
            } catch(e) {
                console.error(e);
            }
        }
    }, [areSongsUploading, songComponents, albumId, artistId, setIsAlbumCreated])

    const getTodaysDate = () => {
        const currentDate = new Date();
        return currentDate.toISOString().split("T")[0];
    }

    const addSongToCreate = () => {
        setSongComponents(prev => [...prev, {artistId: artistId, name: "", trackNum: 0, file: {}}]);
    }

    const uploadAlbumCoverThenAlbum = async () => {
        const imagesUrl = apiHost + "/files/images";
        let imageData = new FormData();
        imageData.append("name", coverFile.name);
        imageData.append("file", coverFile);
        await fetch(imagesUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
            },
            body: imageData
        }).then(rsp => {
            if (rsp.ok) setHasCoverUploaded(true);
            return rsp.json();
        }).then(data => {
            setCoverGuid(data.guid);
            const albumsUrl = apiHost + "/albums";
            fetch(albumsUrl, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    name: title,
                    artistId: parseInt(artistId),
                    releaseDate: releaseDate,
                    coverImageGuid: data.guid
                })
            }).then(rsp => {
                return rsp.json();
            }).then(data => {
                setAlbumId(data.id);
                setAreSongsUploading(true);
            });
        });
    }

    const onClickSubmit = async () => {
        try {
            await uploadAlbumCoverThenAlbum();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="form-container">
            <div className="input-container">
                <p className="label-text">Album Title</p>
                <input value={title} onChange={e => {setTitle(e.target.value)}}></input>
            </div>
            <div className="input-container">
                <p className="label-text">Release Date</p>
                <input type="date" value={releaseDate} max={getTodaysDate()} onChange={e => setReleaseDate(e.target.value)}/>
            </div>
            <div className="input-container">
                <p className="label-text">Album Cover</p>
                {hasCoverUploaded ? (
                    <img className="image-thumbnail" src={blobUrl + "/" + coverGuid} alt="Album Cover"/>
                ) : null}
                <input type="file" onChange={e => setCoverFile(e.target.files[0])} style={{display: "flex"}}/>
            </div>
            <div className="input-container">
                <p className="label-text">Songs</p>
                {songComponents.map((song, index) => <CreateSong i={index} songComponents={songComponents} setSongComponents={setSongComponents} />)}
                <button onClick={addSongToCreate}>Add Song</button>
            </div>
            { areFieldsFilled ? (
                <div className="input-container">
                    <button onClick={onClickSubmit}>Submit</button>
                </div>
            ) : null}
        </div>
    );
}

export default CreateAlbum;