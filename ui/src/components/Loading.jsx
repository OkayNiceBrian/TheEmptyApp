import { Audio } from "react-loader-spinner";
import "./styles/Loading.css";

const Loading = ({ percent }) => {

    return <div className="loading-container">
        <Audio color="#2ec7c7" height="100px"/>
        {percent && <h3>{percent}%</h3>}
    </div>
}

export default Loading;