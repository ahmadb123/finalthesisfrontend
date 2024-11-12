import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/Account.css";


const apiURL = "http://localhost:8080";



function Account() {
    // check if customer valid to access account page or edit account page- 
    // if not valid, redirect to login page
    // first ask customer to enter username and password

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        // Optionally, check if user is already authenticated on component mount
        // This could involve checking a token in local storage or making an API call
    }, []);
    const handleEditAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiURL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if(response.ok){
                setIsAuthenticated(true);
            }else{
                toast.error("Incorrect Password. Please try again.");
                setIsAuthenticated(false);
            }
        } catch (e) {
            console.error("Error", e);
            toast.error("Error occurred logging in");
        }
    }

    function handleEditAccount(){
        if(isAuthenticated){
            // allow edit account - 
            navigate('/edit-account');
        }else{
            navigate('/login'); // redirect to homepage if not authenticated
        }
    }

    function hanldeViewOrders(){
        if(isAuthenticated){
            navigate('/orders');
        }else{
            navigate('/login');
        }
    }

    function handleLoginSecurity(){
        if(isAuthenticated){
            navigate('/login-security');
        }else{
            navigate('/login');
        }
    }

    return(
        <div className="account-page">
            <toastContainer />
            {!isAuthenticated ? (
                
            )}
        </div>
    )
}
