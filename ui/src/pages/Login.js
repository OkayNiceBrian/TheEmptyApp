import { useState } from "react";
import "src/styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        
        return true;
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <p className="login-header-text">Login to Empty Music!</p>
            </div>
            <div className="login-form-container">
                <div className="input-container">
                    <label className="label-text">Email Address</label>
                    <input type="text"/>
                </div>
                <div className="input-container">
                    <label className="label-text">Password</label>
                    <input type="password" minLength={8} required/>
                </div>
                <div className="input-container">
                    <input style={{marginTop: "40px", display: !validateForm() ? "none" : "unset"}} type="submit" />
                </div>
            </div>
        </div>
    );
}

export default Login;