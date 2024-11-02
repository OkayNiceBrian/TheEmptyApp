import "styles/CreateForm.css";

const CreateSong = ({i, songComponents, setSongComponents}) => {
    
    const assignName = (e) => {
        setSongComponents(songComponents.map((song, index) => {
            return i === index ? Object.assign({}, song, {name: e.target.value}) : song
        }))
    }

    const assignFile = async (e) => {
        await readFile(e.target.files[0]);
    }

    const readFile = async (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const audio = new Audio();
            audio.src = e.target.result;
            audio.onloadedmetadata = () => {
                setSongComponents(songComponents.map((song, index) => {
                    return i === index ? Object.assign({}, song, {file: file, trackNum: i + 1, duration: audio.duration}) : song
                }));
            };
            audio.onerror = (e) => console.error(e);
        }
        reader.readAsDataURL(file);
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