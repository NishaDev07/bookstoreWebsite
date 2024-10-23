import { Link, useNavigate } from "react-router-dom";
import LibImg from "../Assets/libraryImg.jpg";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // Import the reCAPTCHA component

export default function Login() {
    const [passwordEntered, setPasswordEntered] = useState("");
    const [userName, setUserName] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null); // State to store CAPTCHA token
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false); // State for loading
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    // Replace this with your actual Site Key
    const recaptchaSiteKey = "6LcX2mkqAAAAACheqHGuKTLEa6apitIeN9JgvCmI"; 

    useEffect(() => {
        async function verifyToken() {
            const LoginTokenStored = localStorage.getItem("LoginToken");
            if (LoginTokenStored) {
                try {
                    const response = await fetch(`http://localhost:5000/fetchToken/${LoginTokenStored}`);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    
                    // Ensure that data is valid and has the 'type' property
                    if (data && data.type === "LoginToken") {
                        setValid(true);
                    }
                } catch (error) {
                    console.error("There was a problem with the auth operation:", error);
                    setErrorMessage("Authentication failed. Please log in again."); // Set error message
                }
            }
        }
        verifyToken();
    }, []);

    async function verifyAuth() {
        if (!captchaToken) {
            alert("Please complete the CAPTCHA");
            return;
        }
        if (!userName || !passwordEntered) {
            setErrorMessage("Please fill in both fields."); // Basic input validation
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch(`http://localhost:5000/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userName, password: passwordEntered, captchaToken }), // Send email, password, and CAPTCHA token to the backend
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            // Check if data contains token
            if (data && data.token) {
                localStorage.setItem("LoginToken", data.token); // Store token in local storage
                setValid(true);
            } else {
                setErrorMessage("Invalid credentials."); // Set error message
            }
        } catch (error) {
            console.error("There was a problem with the auth operation:", error);
            setErrorMessage("Invalid credentials."); // Set error message
        } finally {
            setLoading(false); // End loading
        }
    }

    const nav = useNavigate();
    useEffect(() => {
        if (valid) {
            nav("/Dashboard");
        }
    }, [valid, nav]);

    const onCaptchaChange = (token) => {
        setCaptchaToken(token); // Update CAPTCHA token
    };

    if (!valid) {
        return (
            <div id="loginContainer">
                <div id="loginBox">
                    <img src={LibImg} alt="Library Image" id="libImg" />
                    <div id="loginForm">
                        <p className="italicText">Discover, Explore, Imagine</p>
                        <p className="headText">LOGIN</p>
                        <input
                            type="text"
                            placeholder="Email"
                            value={userName} // Bind value for controlled component
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={passwordEntered} // Bind value for controlled component
                            onChange={(e) => setPasswordEntered(e.target.value)}
                        />
                        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                        {/* reCAPTCHA Component */}
                        <ReCAPTCHA
                            sitekey={recaptchaSiteKey} // Use your actual Site Key here
                            onChange={onCaptchaChange}
                        />
                        <button className="btnLogin" onClick={verifyAuth} disabled={loading}>
                            {loading ? "Logging in..." : "Login"} <i className="fa-solid fa-right-to-bracket"></i>
                        </button>
                        <button className="btnLogin">
                            <i className="fa-brands fa-google"></i> Continue With Google
                        </button>
                        <p>
                            Don't have an Account? <Link to="/Signup">Sign Up</Link>
                        </p>
                        <p>
                            By Continuing, I agree to the{" "}
                            <a href="https://en.wikipedia.org/wiki/Library.com/Library">
                                Terms of Use & Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
