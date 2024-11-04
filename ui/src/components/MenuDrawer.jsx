import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";
import { useAuth } from "contexts/AuthContext";
import "./styles/MenuDrawer.css";

const MenuDrawer = () => {
    const { logout, userArtistId } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return !isOpen ? (
        <div onClick={() => setIsOpen(true)}>
            <Menu01Icon className="drawer-icon" size="30px" color="white"/>
        </div>
    ) : (
        <div className="drawer-container">
            <Cancel01Icon onClick={() => setIsOpen(false)}/>
            <ul onClick={() => setIsOpen(false)}>
                <li>
                    <Link className="link" to={`/artist/${userArtistId}`}><p>My Music</p></Link>
                </li>
                <li>
                    <Link className="link" to="/likes"><p>Likes</p></Link>
                </li>
                <li>
                    <Link className="link" to="/options"><p>Options</p></Link>
                </li>
                <li>
                    <Link className="link" to="/contact"><p>Contact</p></Link>
                </li>
                <li>
                    <Link className="link" onClick={() => logout()}><p>Logout</p></Link>
                </li>
            </ul>
        </div>
    )
}

export default MenuDrawer;