import {useState} from "react";
import "./App.css";
import MainPage from "./MainPage.jsx";

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            if (isLogin) {
                const response = await fetch("http://localhost:8080/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: formData.userName,
                        password: formData.password,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Login failed.");
                }

                setMessage("");
                setIsLoggedIn(true);
                return;
            }

            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    birthDate: formData.birthDate,
                    email: formData.email,
                    userName: formData.userName,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Registration failed.");
            }

            setMessage("Successful registration!");
            setFormData({
                firstName: "",
                lastName: "",
                birthDate: "",
                email: "",
                userName: "",
                password: "",
            });
            setIsLogin(true);
        } catch (error) {
            console.error(error);
            setMessage("An error occurred during registration.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>{isLogin ? "Login" : "Registration"}</h1>
                {isLoggedIn ? (
                    <div className="logged-in-box">
                        <p className="logged-in-text">Logged in</p>
                        <button
                            type="button"
                            onClick={() => {
                                setIsLoggedIn(false);
                                setMessage("Successfully logged out!");
                                setFormData({
                                    userName: "",
                                    firstName: "",
                                    lastName: "",
                                    birthDate: "",
                                    email: "",
                                    password: "",
                                });
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />

                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={formData.userName}
                        onChange={handleChange}
                    />

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <label className="show-password-checkbox">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        Show password
                    </label>

                    <button type="submit">
                        {isLogin ? "Login" : "Registration"}
                    </button>
                </form>
                )}
                {
                    message && <p className="message">{message}</p>
                }

                <p onClick={() => setIsLogin(!isLogin)} className="switch-text">
                    {isLogin
                        ? "Don't have an account yet? Sign up"
                        : "Already have an account? Sign in"}
                </p>
            </div>
            <MainPage/>
        </div>
    );
}

export default App