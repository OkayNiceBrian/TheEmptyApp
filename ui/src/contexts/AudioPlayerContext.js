import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import AudioPlayer from "components/AudioPlayer";
import { apiHost } from "config/host";


const AudioPlayerContext = createContext();

const AudioProvider = ({ children }) => {
    const { token } = useAuth();

    // Audio State
    const [audioContext] = useState(new AudioContext());
    const [trackQueue, setTrackQueue] = useState([]);
    const [audioStream, setAudioStream] = useState(null);
    const [audioSource, setAudioSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [toPlay, setToPlay] = useState(false);
    const [playNextTrack, setPlayNextTrack] = useState(true);
    const [lastPlayedTrack, setLastPlayedTrack] = useState(null);

    // AudioPlayer Component State
    const [isVisible, setIsVisible] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [trackInfo, setTrackInfo] = useState({});

    const playSong = (track) => {
        setTrackQueue([track, ...trackQueue]);
        setToPlay(true);
    };

    const queueSong = (track) => {
        setTrackQueue([...trackQueue, track])
    };

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
                console.log("onended");
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
                const stream = rsp.body;
                setAudioStream(stream);
            } catch (e) {
                console.error(e);
            } 
        }

        if (trackQueue.length > 0 && playNextTrack) {
            setPlayNextTrack(false);
            const trackInfo = trackQueue.shift();
            setLastPlayedTrack(trackInfo);
            setTrackInfo(trackInfo)
            setLastPlayedTrack(trackInfo);
            streamAudio(trackInfo.guid);
            setIsPlaying(true);
            setIsPaused(false);
        }
    }, [trackQueue, token, playNextTrack, audioSource]);

    useEffect(function handleAudio() {
        const readAudio = async () => {
            const arrayBuffer = await new Response(audioStream).arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const source = await audioContext.createBufferSource();
            source.connect(audioContext.destination);
            source.buffer = audioBuffer;
            source.start(0);
            setAudioSource(source);
        }
        if (audioStream) {
            setIsVisible(true);
            readAudio();
        } else {
            setIsVisible(false);
        }
    }, [audioStream, audioContext]);

    useEffect(function handlePause() {
        if (audioSource) {
            if (isPaused) {
                audioSource.playbackRate.value = 0;
            } else {
                audioSource.playbackRate.value = 1;
            }
        }
    }, [isPaused, audioSource])
    

    return (
        <AudioPlayerContext.Provider value={{queueSong, playSong}}>
            {children}
            <AudioPlayer trackInfo={trackInfo} isVisible={isVisible} isPaused={isPaused} setIsPaused={setIsPaused} lastPlayedTrack={lastPlayedTrack} isPlaying={isPlaying} playSong={playSong}/>
        </AudioPlayerContext.Provider>
    );
}

export const useAudio = () => {
    return useContext(AudioPlayerContext);
}

export default AudioProvider;