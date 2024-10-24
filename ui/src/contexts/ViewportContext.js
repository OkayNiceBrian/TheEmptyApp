import { createContext, useState, useEffect, useContext } from "react";

const ViewportContext = createContext({});

const ViewportProvider = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <ViewportContext.Provider value={{width, height}}>
            {children}
        </ViewportContext.Provider>
    );
}

export const useViewport = () => {
    return useContext(ViewportContext);
}

export default ViewportProvider;