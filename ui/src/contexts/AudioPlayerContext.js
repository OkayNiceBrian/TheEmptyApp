import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useAuth } from "src/auth/AuthContext";
import AudioPlayer from "src/components/AudioPlayer";
import { apiHost } from "src/config/host";


const AudioPlayerContext = createContext();

const AudioProvider = ({ children }) => {
    const { token } = useAuth();

    const [audioContext, setAudioContext] = useState(new AudioContext());
    const [trackQueue, setTrackQueue] = useState([]);
    const [audioStream, setAudioStream] = useState(null);
    const [audioSource, setAudioSource] = useState(null);

    const [isVisible, setIsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
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

        if (trackQueue.length > 0) {
            streamAudio(trackQueue.pop());
        }
    }, [trackQueue, token]);

    useEffect(() => {
        const readAudio = async () => {
            const arrayBuffer = await new Response(audioStream).arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const source = await audioContext.createBufferSource();
            source.buffer = audioBuffer;
            setAudioSource(source);
        }
        if (audioStream) {
            setIsVisible(true);
            setIsPlaying(true);
            readAudio();
        } else {
            setIsVisible(false);
            setIsPlaying(false);
        }
    }, [audioStream, audioContext]);

    useEffect(() => {
        if (audioSource) {
            audioSource.connect(audioContext.destination);
            audioSource.start(0);
        }
    }, [audioSource, audioContext]);
    
    const queueSong = (guid) => {
        setTrackQueue([...trackQueue, guid])
    };

    return (
        <AudioPlayerContext.Provider value={queueSong}>
            {children}
            <AudioPlayer isVisible={isVisible} isPlaying={isPlaying} isPlayerLoading={isPlayerLoading}/>
        </AudioPlayerContext.Provider>
    );
}

export const useAudio = () => {
    return useContext(AudioPlayerContext);
}

export default AudioProvider;