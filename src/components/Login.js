import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            toast.error("Email/Password is required!");
            return;
        }
        if (email.trim() === "admin" && password === "5140") {
            loginContext(email);
            toast.success("Login succeed");
            navigate("/");
        } else {
            toast.error("Email or password is incorrect!");
        }
    }

    const handleGoBack = () => {
        navigate("/");
    }

    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin();
        }
    }

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Log in</div>
                <div className="text">Email or Username</div>
                <input
                    type="text"
                    placeholder="Email or Username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className="input-password">
                    <input
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i
                        className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <button
                    className={email && password ? "active" : ""}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >Login</button>
                <div className="back"><i className="fa-solid fa-angles-left"></i>
                    <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
                </div>
            </div>
        </>
    )
}
export default Login;