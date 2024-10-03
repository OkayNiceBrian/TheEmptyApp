import { createContext, useContext, useState, useMemo } from "react";
import { useAuth } from "src/auth/AuthContext";
import { apiHost } from "src/config/host";


const AudioPlayerContext = createContext();

const AudioProvider = ({ children }) => {
    const { token } = useAuth();
    const [audioContext, setAudioContext] = useState(null);
    
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

    const contextValue = useMemo(() => ({
        streamAudio
    }), []);

    return (
        <AudioPlayerContext.Provider value={contextValue}>
            {children}
        </AudioPlayerContext.Provider>
    );
}

export const useAudio = () => {
    return useContext(AudioPlayerContext);
}

export default AudioProvider;