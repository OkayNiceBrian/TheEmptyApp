import { Outlet, Link } from "react-router-dom";
import logo from "src/assets/logo.png"
import 'src/styles/Layout.css';

const Layout = () => {
    return(
        <>
            <nav className="top-container">
                <img className="logo" src={logo} alt="Empty Music"/>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link className="link" to="/"><p className="nav-text">Home</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to="/artist/1"><p className="nav-text">My Music</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to="/create/artist"><p className="nav-text">Create Artist</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to="/contact"><p className="nav-text">Contact</p></Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

export default Layout;