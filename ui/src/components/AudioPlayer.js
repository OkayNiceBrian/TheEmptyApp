import { PauseIcon, PlayCircle02Icon, PreviousIcon, VolumeHighIcon } from "hugeicons-react";
import { blobUrl } from "config/host";
import "styles/AudioPlayer.css";

const AudioPlayer = ({ trackInfo, isVisible, isPaused, setIsPaused, isPlayerLoading, lastPlayedTrack, isPlaying, playSong }) => {

    const onClickPlay = () => {
        if (lastPlayedTrack && !isPlaying) {
            playSong(lastPlayedTrack);
        }
        setIsPaused(!isPaused)
    }
    
    return (
        <div style={{display: isVisible ? "flex" : "none"}} className="audioPlayer-container">
            <div className="audioPlayer-info-container">
                <img className={"audioPlayer-cover-image"} src={blobUrl + "/" + trackInfo.coverImageGuid} alt={"cover"}/>
                <div className={"audioPlayer-info-text-container"}>
                    <p className="audioPlayer-info-text-song">{trackInfo.songName}</p>
                    <p className="audioPlayer-info-text-artist">{trackInfo.artistName}</p>
                </div>
            </div>
            <div className="audioPlayer-controls-container">
                <PreviousIcon className={"audioPlayer-icon"} size={"30px"}/>
                { !isPaused ? 
                    <PauseIcon onClick={() => setIsPaused(!isPaused)} className={"audioPlayer-icon"} size={"40px"}/> : 
                    <PlayCircle02Icon onClick={() => onClickPlay()} className={"audioPlayer-icon"} size={"40px"}/>
                }
                <PreviousIcon className={"audioPlayer-icon"} style={{rotate: "180deg"}} size={"30px"} />
            </div>
            <div className="audioPlayer-volume-container">
                <VolumeHighIcon />
                <div className="audioPlayer-volume-slider"/>
            </div>
        </div>
    );
}

export default AudioPlayer;