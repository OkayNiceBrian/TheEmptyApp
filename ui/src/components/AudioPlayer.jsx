import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { PauseIcon, PlayCircle02Icon, PreviousIcon, VolumeHighIcon } from "hugeicons-react";
import { useViewport } from "contexts/ViewportContext";
import { blobUrl } from "config/host";
import { convertDuration } from 'helpers/Util';
import "./styles/AudioPlayer.css";

const AudioPlayer = memo(({ trackInfo, isVisible, isPaused, setIsPaused, isPlayerLoading, lastPlayedTrack, isPlaying, playSong, skipSong, queueLength, currentTime, volume, setVolume }) => {
    const { width } = useViewport();

    const onClickPlay = () => {
        if (lastPlayedTrack && !isPlaying) {
            playSong(lastPlayedTrack);
        }
        setIsPaused(!isPaused)
    }
    
    return (
        <div style={{display: isVisible ? "flex" : "none"}} className="audioPlayer-container">
            <div className="audioPlayer-info-container">
                <Link to={`/artist/${trackInfo.artistId}/album/${trackInfo.albumId}`}><img className={"audioPlayer-cover-image"} src={blobUrl + "/" + trackInfo.coverImageGuid} alt={"cover"}/></Link>
                {width > 800 && <div className={"audioPlayer-info-text-container"}>
                    <Link className='audioPlayer-link' to={`/artist/${trackInfo.artistId}/album/${trackInfo.albumId}`}><p className="audioPlayer-info-text-song">{trackInfo.songName}</p></Link>
                    <Link className='audioPlayer-link' to={`/artist/${trackInfo.artistId}`}><p className="audioPlayer-info-text-artist">{trackInfo.artistName}</p></Link>
                </div> }
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
                <p className='audioPlayer-time-text'>{convertDuration(currentTime)}/{convertDuration(trackInfo.duration)}</p>
                <VolumeHighIcon />
                <input type='range' min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(e.target.value)} className='audioPlayer-volume-slider' />
            </div>
        </div>
    );
});

export default AudioPlayer;