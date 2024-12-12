// src/pages/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/RegisterPage.css";

const apiURL = "http://localhost:8080";

function togglePassword() {
    let password = document.getElementById("passwordInput");
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [state, setState] = useState("");

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (username.length < 4) {
            toast.error("Username must be at least 4 characters long");
            return;
        }

        if (password.length < 6) {
            const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
            if (!passwordPattern.test(password)) {
                toast.error(
                    "Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, and one number."
                );
                return;
            }
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailAddress)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch(`${apiURL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                    emailAddress,
                    firstName,
                    lastName,
                    dateOfBirth: dateOfBirth || null,
                    gender: gender || null,
                    phoneNumber: phoneNumber || null,
                    address: {
                        city,
                        country,
                        postalCode,
                        state,
                    },
                }),
            });
            const data = await response.text();
            if (response.ok) {
                toast.success("Registration successful!");
                navigate("/login");
            } else {
                toast.error(`Registration failed: ${data}`);
            }
        } catch (error) {
            console.error("Error", error);
            toast.error("An error occurred during registration");
        }
    };

    return (
        <div className="register-container">
            <h2>Create Account</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username (e.g. John123)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password (e.g. Xb12@00)"
                        value={password}
                        id="passwordInput"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="show-password">
                    <input type="checkbox" onClick={togglePassword} />
                    <label>Show Password</label>
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="text"
                        placeholder="Email (e.g. john@example.com)"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="First Name (e.g. John)"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder="Last Name (e.g. Doe)"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                {/* New fields for phone number, gender, and date of birth */}
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        placeholder="Phone Number (e.g. +1 1234567890)"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-button">
                    Register
                </button>
            </form>
            <ToastContainer />
            <div className="register-footer">
                Already Registered? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default RegisterPage;
