import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo.png"
import '../styles/Layout.css';

const Layout = () => {
    return(
        <>
            <nav class="top-container">
                <img class="logo" src={logo} alt="Empty Music"/>
                <ul class="nav-list">
                    <li class="nav-item">
                        <Link class="link" to="/"><p class="nav-text">Home</p></Link>
                    </li>
                    <li class="nav-item">
                        <Link class="link" to="/artist/1"><p class="nav-text">My Music</p></Link>
                    </li>
                    <li class="nav-item">
                        <Link class="link" to="/contact"><p class="nav-text">Contact</p></Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

export default Layout;