import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import { useDispatch } from "react-redux";
import { setAuthData } from "store/rootReducer";
import { apiHost } from "config/host";
import backgroundImage from "assets/home-bck.webp";
import "styles/Login.css";

const Login = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        const emailRx = new RegExp(/(.+@.+\..+)/);
        return (emailRx.test(email) || password.length >= 8);
    }

    const onClickSubmit = () => {
        setLoading(true);
    }

    useEffect(() => {
        if (loading) {
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
                    dispatch(setAuthData(data));
                }
            }).finally(() => setLoading(false))
            .catch(e => console.error(e));
        }
    }, [loading])

    if (loading) return <Loading/>

    return (
        <>
        <img src={backgroundImage} alt={"Home"} className="login-background"/>
        <p className="login-header">Welcome to Empty Music</p>
        <p className="login-subheader">Streaming for the aspiring artist</p>
        <div className="login-container">
            <div className="login-form-container">
                <div className="input-container">
                    <label className="login-label">Email Address</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-container">
                    <label className="login-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="input-container">
                    <input style={{marginTop: "20px", backgroundColor: validateForm() ? "#003135" : "gray"}} className="login-button" type="submit" onClick={validateForm() ? onClickSubmit : null}/>
                </div>
                <p className="login-text" style={{marginTop: "40px"}}>Don't have an account? Create one <Link className="link-text" to={"/register"}>here</Link>.</p>
            </div>
        </div>
        </>
    );
}

export default Login;