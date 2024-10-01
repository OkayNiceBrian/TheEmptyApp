import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "src/auth/AuthContext";
import { apiHost } from "src/config/host";
import "src/styles/Login.css";

const Login = () => {
    const { setUserData } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        const emailRx = new RegExp(/(.+@.+\..+)/);
        return (emailRx.test(email) || password.length >= 8);
    }

    const onClickSubmit = () => {
        const url = apiHost + "/account/login";
        const login = {
            email: email,
            password: password
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        }).then(rsp => rsp.json())
        .then(data => {
            if (data.token) {
                setUserData(data);
            }
        }).catch(e => console.error(e));
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <p className="login-header-text">Login to Empty Music!</p>
            </div>
            <div className="login-form-container">
                <div className="input-container">
                    <label className="label-text">Email Address</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label className="label-text">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input style={{marginTop: "20px", display: !validateForm() ? "none" : "unset"}} type="submit" onClick={onClickSubmit}/>
                </div>
            </div>
            <p className="label-text" style={{marginTop: "20px"}}>Don't have an account? Create one <Link className="link-text" to={"/register"}>here</Link>.</p>
        </div>
    );
}

export default Login;