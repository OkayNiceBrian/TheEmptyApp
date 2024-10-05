import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "auth/AuthContext";
import AudioPlayer from "components/AudioPlayer";
import { apiHost } from "config/host";


const AudioPlayerContext = createContext();

const AudioProvider = ({ children }) => {
    const { token } = useAuth();

    const [audioContext, setAudioContext] = useState(new AudioContext());
    const [trackQueue, setTrackQueue] = useState([]);
    const [audioStream, setAudioStream] = useState(null);
    const [audioSource, setAudioSource] = useState(null);
    const [playNextTrack, setPlayNextTrack] = useState(true);

    const [isVisible, setIsVisible] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const [isPlayerLoading, setIsPlayerLoading] = useState(false);

    useEffect(() => {
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
            streamAudio(trackQueue.pop());
        }
    }, [trackQueue, token, playNextTrack]);

    useEffect(() => {
        const readAudio = async () => {
            const arrayBuffer = await new Response(audioStream).arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const source = await audioContext.createBufferSource();
            source.connect(audioContext.destination);
            source.buffer = audioBuffer;
            setAudioSource(source);
        }
        if (audioStream) {
            setIsVisible(true);
            setIsPaused(false);
            readAudio();
        } else {
            setIsVisible(false);
            setIsPaused(true);
        }
    }, [audioStream, audioContext]);

    useEffect(() => {
        if (audioSource) { 
            audioSource.start(0);
        }
    }, [audioSource, audioContext]);
    
    const queueSong = (guid) => {
        setTrackQueue([...trackQueue, guid])
    };

    useEffect(() => {
        if (audioSource) {
            audioSource.onended = (e) => {
                setPlayNextTrack(true);
            };
        }
    })
    

    return (
        <AudioPlayerContext.Provider value={queueSong}>
            {children}
            <AudioPlayer isVisible={isVisible} isPlaying={isPaused} isPlayerLoading={isPlayerLoading}/>
        </AudioPlayerContext.Provider>
    );
}

export const useAudio = () => {
    return useContext(AudioPlayerContext);
}

export default AudioProvider;