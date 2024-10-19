import { useState } from 'react';
import { PauseIcon, PlayCircle02Icon, PreviousIcon, VolumeHighIcon } from "hugeicons-react";
import { blobUrl } from "config/host";
import { convertDuration } from 'helpers/Util';
import "styles/AudioPlayer.css";

const AudioPlayer = ({ trackInfo, isVisible, isPaused, setIsPaused, isPlayerLoading, lastPlayedTrack, isPlaying, playSong, skipSong, queueLength }) => {
    const [currentTime, setCurrentTime] = useState(0);

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
                <PreviousIcon className={"audioPlayer-icon-inactive"} size={"30px"}/>
                { !isPaused ? 
                    <PauseIcon onClick={() => setIsPaused(!isPaused)} className={"audioPlayer-icon"} size={"40px"}/> : 
                    <PlayCircle02Icon onClick={() => onClickPlay()} className={"audioPlayer-icon"} size={"40px"}/>
                }
                <PreviousIcon className={queueLength > 0 ? "audioPlayer-icon" : "audioPlayer-icon-inactive"} style={{rotate: "180deg"}} size={"30px"} onClick={skipSong}/>
            </div>
            <div className="audioPlayer-volume-container">
                <p className='audioPlayer-time-text'>{currentTime}/{convertDuration(trackInfo.duration)}</p>
                <VolumeHighIcon />
                <input type='range' className='audioPlayer-volume-slider' />
            </div>
        </div>
    );
}

export default AudioPlayer;