// src/pages/HomePage.js
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../assets/styles/HomePage.css';
import {useNavigate} from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();
  
    return (
        <div className="navbar">
            <div className="navbar-content">
                <span className="brand-name">Tezkar</span>
                <div className="account-icon" onClick={() => navigate('/account')}>
                    <FaUserCircle />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
