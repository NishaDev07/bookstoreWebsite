import { Link, useNavigate } from "react-router-dom";
import LibImg from "../Assets/libraryImg.jpg";
import { useEffect, useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSignup() {
        // Basic input validation
        if (!email || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        // You can add more validations here (e.g., email format, password strength)

        setLoading(true);
        setErrorMessage(""); // Reset error message

        try {
            const response = await fetch(`http://localhost:5000/signup`, {  // Modified endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),  // Send email and password
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Sign-up failed, please try again."); // Improved error handling
            }

            localStorage.setItem("LoginToken", data.token); // Store the JWT token
            localStorage.setItem("LoggedInUserID", data.userId); // Store user ID
            setValid(true);
        } catch (error) {
            console.error("There was a problem with the sign-up operation:", error);
            setErrorMessage(error.message); // Show error message to the user
        } finally {
            setLoading(false);
        }
    }

    const nav = useNavigate();
    useEffect(() => {
        if (valid) {
            nav("/Dashboard");
        }
    }, [valid, nav]);

    return (
        <div className="signupContainer">
            <div className="signupBox">
                <img src={LibImg} alt="Library" className="libImg" />
                <div className="signupForm">
                    <h2>Sign Up</h2>
                    <p>Join the community and start exploring.</p>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {loading ? (
                        <button className="btnSignup" disabled>
                            Signing Up...
                        </button>
                    ) : (
                        <button className="btnSignup" onClick={handleSignup}>
                            Sign Up
                        </button>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                    <p>
                        By signing up, I agree to the{" "}
                        <a href="https://en.wikipedia.org/wiki/Library.com/Library">
                            Terms of Use & Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
