import { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/rootReducer";
import AudioPlayer from "components/AudioPlayer";
import { apiHost } from "config/host";


const AudioPlayerContext = createContext();

const AudioProvider = ({ children }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);

    // Audio State
    const [audioContext, setAudioContext] = useState(null);
    const [trackQueue, setTrackQueue] = useState([]);
    const [audioStream, setAudioStream] = useState(null);
    const [audioSource, setAudioSource] = useState(null);
    const [gainNode, setGainNode] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [toPlay, setToPlay] = useState(false);
    const [playNextTrack, setPlayNextTrack] = useState(true);
    const [lastPlayedTrack, setLastPlayedTrack] = useState(null);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [counting, setCounting] = useState(false);

    // AudioPlayer Component State
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [trackInfo, setTrackInfo] = useState({});

    const playSong = (track) => {
        setTrackQueue([track, ...trackQueue]);
        setToPlay(true);
    };

    const queueSong = (track) => {
        setTrackQueue([...trackQueue, track])
    };

    const playAlbum = (songList) => {
        setTrackQueue([...songList]);
        setToPlay(true);
    }

    const skipSong = () => {
        if (trackQueue.length > 0) {
            setToPlay(true);
        }
    }

    useEffect(function countSeconds() {
        const interval = setInterval(() => {
            if (counting && currentTime < trackInfo.duration) {
                setCurrentTime(prev => prev + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [counting]);

    useEffect(function checkTracksQueued() {
        if (toPlay) {
            if (audioSource) {
                audioSource.stop();
            } else {
                setPlayNextTrack(true);
            }
            setToPlay(false);
        }
    }, [toPlay, audioSource])

    useEffect(function onAudioEnd() {
        if (audioSource) {
            audioSource.onended = (e) => {
                if (trackQueue.length > 0) {
                    setIsPaused(false);
                    setPlayNextTrack(true);
                } else {
                    setIsPaused(true);
                    setIsPlaying(false);
                    setPlayNextTrack(true);
                }
            };
        }
    }, [audioSource, trackQueue]);

    useEffect(function handleStreaming() {
        const streamAudio = async (guid) => {
            try {
                const url = apiHost + "/files/audio/stream";
                const guidDto = {
                    guid: guid
                };
                const rsp = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(guidDto)
                });
                if (rsp.status === 401) dispatch(logout());
                const stream = rsp.body;
                setAudioStream(stream);
            } catch (e) {
                console.error(e);
            } 
        }

        if (trackQueue.length > 0 && playNextTrack) {
            if (audioContext == null) {
                setAudioContext(new AudioContext());
            }
            setPlayNextTrack(false);
            const trackInfo = trackQueue.shift();
            setLastPlayedTrack(trackInfo);
            setTrackInfo(trackInfo)
            setLastPlayedTrack(trackInfo);
            streamAudio(trackInfo.guid);
            setIsPlaying(true);
            setIsPaused(false);
            setCurrentTime(0);
        }
    }, [trackQueue, token, playNextTrack, audioSource, audioContext]);

    useEffect(function handleAudio() {
        const readAudio = async () => {
            const arrayBuffer = await new Response(audioStream).arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const source = await audioContext.createBufferSource();
            const gainNode = audioContext.createGain();
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            source.buffer = audioBuffer;
            source.start(0);
            setAudioSource(source);
            setGainNode(gainNode);
            setStartTime(audioContext.currentTime);
        }
        if (audioStream) {
            setIsVisible(true);
            readAudio();
        } else {
            setIsVisible(false);
        }
    }, [audioStream, audioContext]);

    useEffect(function handleVolume() {
        if (audioContext && gainNode) {
            gainNode.gain.setValueAtTime(parseFloat(volume), audioContext.currentTime);
        }
    }, [audioContext, gainNode, volume]);

    useEffect(function handlePause() {
        if (audioSource) {
            if (isPaused) {
                audioSource.playbackRate.value = 0;
                setCounting(false);
            } else {
                audioSource.playbackRate.value = 1;
                setCounting(true);
            }
        }
    }, [isPaused, audioSource])

    return (
        <AudioPlayerContext.Provider value={{queueSong, playSong, playAlbum, skipSong}}>
            {children}
            {isVisible && 
            <AudioPlayer trackInfo={trackInfo} 
                isVisible={isVisible} 
                isPaused={isPaused} 
                setIsPaused={setIsPaused} 
                lastPlayedTrack={lastPlayedTrack} 
                isPlaying={isPlaying} 
                playSong={playSong} 
                skipSong={skipSong} 
                queueLength={trackQueue.length} 
                currentTime={currentTime} 
                volume={volume} 
                setVolume={setVolume}
            />}
        </AudioPlayerContext.Provider>
    );
}

export const useAudio = () => {
    return useContext(AudioPlayerContext);
}

export default AudioProvider;