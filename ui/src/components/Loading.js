import { Audio } from "react-loader-spinner";
import "styles/Loading.css";

const Loading = () => {

    return <div className="loading-container">
        <Audio color="#2ec7c7" height="100px"/>
    </div>
}

export default Loading;