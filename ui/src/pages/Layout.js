import { Outlet, Link } from "react-router-dom";
import { useAuth } from "src/auth/AuthContext";
import logo from "src/assets/logo.png"
import 'src/styles/Layout.css';

const Layout = () => {
    const { logout, userArtistId } = useAuth();
    return(
        <div className="layout-container">
            <nav className="top-container">
                <img className="logo" src={logo} alt="Empty Music"/>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link className="link" to="/"><p className="nav-text">Home</p></Link>
                    </li>
                    <li className="nav-item" style={{display: !userArtistId ? "none" : "unset"}}>
                        <Link className="link" to={`/artist/${userArtistId}`}><p className="nav-text">My Music</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to="/create/artist"><p className="nav-text">Create Artist</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to="/contact"><p className="nav-text">Contact</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" onClick={() => logout()}><p className="nav-text">Logout</p></Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Layout;