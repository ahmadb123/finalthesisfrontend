import { useEffect } from "react";
import "../assets/styles/Account.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiURL = "http://localhost:8080";


function Account() {
    const role = localStorage.getItem('userRole') || 'guest';
    const username = localStorage.getItem('username') || 'Guest';
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => { 
        handleValidation();
    }, []);
    const handleValidation = async (e) => {
        if(role !== 'user'){
            toast.error("Please login to access your account");
            setIsAuthenticated(false);
            return;
        }else{
            setIsAuthenticated(true);
        }
    }

    return (
        <div className="wrapper"> {/* Centering wrapper */}
            <div className="account-page">
                <h1>Your account</h1>
                <p>Welcome, {username}</p>
                {isAuthenticated && (
                        <div className="account-options">
                        <div className="account-option" onClick={() => navigate("/login-security")}>
                                <h2>Login & Security</h2>
                                <p>Edit login, name, and mobile number</p>
                            </div>
                            <div className="account-option" onClick={() => navigate("/editAccount")}>
                                <h2>Your Addresses</h2>
                                <p>Edit, remove or set default address</p>
                            </div>

                            <div className="account-option" onClick={() => navigate("/orders")}>
                                <h2>Your Orders</h2>
                                <p>Track, return, cancel an order, download invoice or buy again</p>
                            </div>
                        </div>
                                        )}
                <ToastContainer />
            </div>
        </div>
    );
}

export default Account;