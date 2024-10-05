import backgroundImage from "assets/home-bck.jpg";
import "styles/Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <img src={backgroundImage} alt={"Home"} className="home-image"/>
            <p className="home-header">Welcome to Empty Music</p>
            <p className="home-body">Streaming for the aspiring artist</p>
        </div>
    );
}

export default Home;