import React from "react";
import AppRoutes from "../routes";
import {useNavigate} from 'react-router-dom';

function LandingPage(){
    const navigate = useNavigate();
    return(
        <div className="landing-page">
            <h1>Welcome to our store!</h1>
            <h2>Enjoy shopping securely!</h2>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    );
}

export default LandingPage;