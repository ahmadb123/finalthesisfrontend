import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/LandingPage.css";

function LandingPage(){
    const navigate = useNavigate();
    const apiUrl = 'http://localhost:8080';
    const [isLoading, setIsLoading] = useState(false);

    const guestLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/auth/guest-login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' }
            });
            if(response.ok) {
                const data = await response.json();
                const token = data.token;
                const role = data.role;
                if(token){
                    localStorage.setItem('jwtToken', token); 
                    localStorage.setItem('userRole', role);
                    localStorage.setItem('username', 'Guest');
                    toast.success("Logged in as Guest");
                    navigate('/homePage', { state: { isGuest: true } });  
                } else {
                    toast.error('Token not found');
                }
            } else {
                const textError = await response.text();
                toast.error(`Login failed: ${textError}`);
            }
        } catch (e) {
            console.error("Error", e);
            toast.error('Error occurred logging in');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="landing-page">
            <h1>Welcome to our store!</h1>
            <h2>Enjoy shopping securely!</h2>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={guestLogin} disabled={isLoading} className="guest-login-button">
                {isLoading ? "Logging in..." : "Guest Login"}
            </button>
            <ToastContainer />
        </div>
    );
}

export default LandingPage;
