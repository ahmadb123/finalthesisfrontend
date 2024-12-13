import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/LoginSecurity.css";

const apiUrl = "http://localhost:8080";

function LoginSecurity() {
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    useEffect(() => {
        if (!role) {
            navigate("/login");
            return;
        }
        getCurrentDetails();
    }, []);

    const getCurrentDetails = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/get-user-details`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setFirstname(data.firstName);
                setLastname(data.lastName);
                setEmail(data.email);
                setDateOfBirth(data.dateOfBirth);
                setPhoneNumber(data.phoneNumber);
                setGender(data.gender);
            } else {
                toast.error("Error occurred getting user details");
            }
        } catch (e) {
            console.error("Error", e);
            toast.error("Error occurred getting user details");
        }
    };

    return (
        <div className="container">
            {/* Left Tab Navigation */}
            <div className="side-bar">
                <h3>ACCOUNT OVERVIEW</h3>
                <ul>
                    <li onClick={() => navigate("/login-security")}>Personal Information</li>
                    <li onClick={() => navigate("/edit-address")}>Address Book</li>
                    <li onClick={() => navigate("/preferences")}>Preferences</li>
                    <li onClick={() => navigate("/logout")}>Log Out</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h1>MY DETAILS</h1>
                <p>Feel free to edit any of your details below so your account is up to date.</p>
                <div className="details">
                    <p>{firstName} {lastName}</p>
                    <p>{dateOfBirth}</p>
                    <p>{gender}</p>
                </div>
                <div className="login-email-details">
                    <h2>EMAIL</h2>
                    <p>{email}</p>
                    <h3>Edit</h3>
                </div>
                <div className="logout-section">
                    <button
                        className="action-button"
                        onClick={() => {
                            localStorage.clear();
                            toast.success("Logged out successfully!");
                            navigate("/login");
                        }}
                    >
                        LOG ME OUT
                        <span className="arrow">→</span>
                    </button>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default LoginSecurity;
