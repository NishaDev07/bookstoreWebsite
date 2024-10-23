import { Link, useNavigate } from "react-router-dom";
import LibImg from "../Assets/libraryImg.jpg";
import { useEffect, useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [valid, setValid] = useState(false);

    async function handleSignup() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/createUser/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            if (data.success) {
                const responseTokenGenerate = await fetch(`http://localhost:5000/setToken/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                });
                const tokendata = await responseTokenGenerate.json();
                localStorage.setItem("LoginToken", tokendata.insertedId);
                localStorage.setItem("LoggedInUserID", data._id);
                setValid(true);
            } else {
                alert("Sign-up failed, please try again.");
            }
        } catch (error) {
            console.error("There was a problem with the sign-up operation:", error);
            alert("Error during sign-up. Please try again.");
        }
    }

    const nav = useNavigate();
    useEffect(() => {
        if (valid) {
            nav("/Dashboard");
        }
    }, [valid, nav]);

    if (!valid) {
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
                        <button className="btnSignup" onClick={handleSignup}>
                            Sign Up
                        </button>
                        {/* <p>
                            Already have an account? <Link to="/">Login</Link>
                        </p> */}
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

    return null;
}
