import "src/styles/CreateForm.css";

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
        <div class="form-container">
            <div class="input-container">
                <p class="field-text">{i + 1}. Song Title</p>
                <input value={songComponents[i].name} onChange={e => assignName(e)}/>
            </div>
            <div class="input-container">
                <p class="field-text">Audio File (.mp3 only)</p>
                <input type="file" onChange={e => assignFile(e)}/>
            </div>
        </div>
    );
}

export default CreateSong;