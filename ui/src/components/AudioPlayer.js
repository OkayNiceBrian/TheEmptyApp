import { PauseIcon, PlayCircle02Icon, PreviousIcon, VolumeHighIcon } from "hugeicons-react";
import { blobUrl } from "config/host";
import "styles/AudioPlayer.css";

const AudioPlayer = ({ isVisible, isPlaying, isPlayerLoading }) => {
    
    return (
        <div style={{display: isVisible ? "flex" : "none"}} className="audioPlayer-container">
            <div className="audioPlayer-info-container">
                <img className={"audioPlayer-cover-image"} src={blobUrl + "/images/b2ed5e12-2e44-4490-87bf-d3ff69859a4a.png"} alt={"cover"}/>
                <div className={"audioPlayer-info-text-container"}>
                    <p className="audioPlayer-info-text-song">What?</p>
                    <p className="audioPlayer-info-text-artist">Yabby</p>
                </div>
            </div>
            <div className="audioPlayer-controls-container">
                <PreviousIcon className={"audioPlayer-icon"} size={"30px"}/>
                { isPlaying ? 
                    <PauseIcon className={"audioPlayer-icon"} size={"40px"}/> : 
                    <PlayCircle02Icon className={"audioPlayer-icon"} size={"40px"}/>
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