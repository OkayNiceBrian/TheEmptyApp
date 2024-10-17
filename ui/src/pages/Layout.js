import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import logo from "assets/logo.png"
import 'styles/Layout.css';

const Layout = () => {
    const { logout, userArtistId } = useAuth();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    const trySearch = (key) => {
        if (key === "Enter" && searchQuery !== "") {
            navigate(`/search/${searchQuery}`);
            window.location.reload();
        }
    }

    return(
        <div className="layout-container">
            <nav className="top-container">
                <Link className="link" to="/">
                    <img className="logo" src={logo} alt="Empty Music"/>  
                </Link>  
                <ul className="nav-list">
                    <li>
                        <input className="search-bar" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => trySearch(e.key)}/>
                    </li>
                    <li className="nav-item" style={{display: !userArtistId ? "none" : "unset"}}>
                        <Link className="link" to={`/artist/${userArtistId}`}><p className="nav-text">My Music</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to="/likes"><p className="nav-text">Likes</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="link" to="/options"><p className="nav-text">Options</p></Link>
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