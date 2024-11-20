import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "store/rootReducer";
import { apiHost } from "config/host";
import backgroundImage from "assets/home-bck.png";
import "styles/Login.css";
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const validateForm = () => {
        const emailRx = new RegExp(/(.+@.+\..+)/);
        return (emailRx.test(email) && password.length >= 8 && password === confirmPassword);
    }

    const onClickSubmit = () => {
        const url = apiHost + "/account/register";
        const register = {
            email: email,
            userName: username,
            password: password
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(register)
        }).then(rsp => rsp.json())
        .then(data => {
            if (data.token) {
                dispatch(setAuthData(data));
                navigate("/");
            }
        }).catch(e => console.error(e));
    }

    return (
        <div className="login-container">
            <img src={backgroundImage} alt={"Home"} className="login-background"/>
            <div className="login-header">
                <p className="login-header-text">Register</p>
            </div>
                <div className="login-form-container">
                <div className="input-container">
                    <label className="label-text">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label className="label-text">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label className="label-text">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label className="label-text">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input type="submit" onClick={() => onClickSubmit()} style={{marginTop: "20px", display: !validateForm() ? "none" : "unset"}}/>
                </div>
            </div>
            <p className="login-text" style={{marginTop: "40px"}}>Back to <Link className="link-text" to={"/"}>login</Link>.</p>
        </div>
    );
}

export default Register;