import "styles/CreateForm.css";

const EditSong = ({song, audioUpdates, setAudioUpdates}) => {

    const assignFile = async (e) => {
        await readFile(e.target.files[0]);
    }

    const readFile = async (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const audio = new Audio();
            audio.src = e.target.result;
            audio.onloadedmetadata = () => {
                setAudioUpdates(audioUpdates.map((a) => {
                    return song.audioFileGuid === a.guid ? Object.assign({}, audio, {file: file, duration: audio.duration}) : a
                }));
            };
            audio.onerror = (e) => console.error(e);
        }
        reader.readAsDataURL(file);
    }

    return (
        <div className="form-container form-container-border">
            <div className="input-container">
                <p className="label-text">Edit</p>
                <p className="label-text">{song.trackNum}. {song.name}</p>
            </div>
            <div className="input-container">
                <p className="label-text">Audio File (.mp3 only)</p>
                <input type="file" onChange={e => assignFile(e)}/>
            </div>
        </div>
    );
}

export default EditSong;