import backgroundImage from "assets/home-bck.webp";
import { useSelector } from "react-redux";
import "styles/Home.css";

const Home = () => {
    const username = useSelector((state) => state.username);
    return (
        <div className="home-container">
            <img src={backgroundImage} alt={"Home"} className="home-image"/>
            <p className="home-header">Welcome to Empty Music,</p>
            <p className="home-body">{username}!</p>
        </div>
    );
}

export default Home;