import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useAuth } from "src/auth/AuthContext";
import AudioPlayer from "src/components/AudioPlayer";
import { apiHost } from "src/config/host";


const AudioPlayerContext = createContext();

const AudioProvider = ({ children }) => {
    const { token } = useAuth();

    const [audioContext, setAudioContext] = useState(null);
    const [trackQueue, setTrackQueue] = useState([]);

    const [isVisible, setIsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerLoading, setIsPlayerLoading] = useState(false);

    useEffect(() => {

    }, []);
    
    const setupAudioStream = () => {
        const _ctx = new AudioContext();
        const source = _ctx.createMediaStreamSource();
        setAudioContext(_ctx);
    }
    
    const streamAudio = async (guid) => {
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
        const reader = rsp.body.getReader();
        const {value} = await reader.read();
        console.log(value);
    }

    const contextValue = useMemo(() => {
        const queueSong = (guid) => {
            trackQueue.push(guid);
        };
        return (
            queueSong
        );
    }, [trackQueue]);

    return (
        <AudioPlayerContext.Provider value={contextValue}>
            {children}
            <AudioPlayer isVisible={isVisible} isPlaying={isPlaying} isPlayerLoading={isPlayerLoading}/>
        </AudioPlayerContext.Provider>
    );
}

export const useAudio = () => {
    return useContext(AudioPlayerContext);
}

export default AudioProvider;