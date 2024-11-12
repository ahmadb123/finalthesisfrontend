import { useEffect } from "react";
import "../assets/styles/Account.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const apiURL = "http://localhost:8080";


function Account() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => { 
    }, []);
    const handleValidation = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${apiURL}/api/auth/login`,{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({username, password}),
            });
            if(response.ok){
                setIsAuthenticated(true);
            }else if(response.status === 401){
                setIsAuthenticated(false);
                toast.error("Incorrect Password/Username. Please try again.");
            }else{
                const textError = await response.text();
                toast.error(`Login failed: ${textError}`);
            }
        }catch(e){
            console.error("Error", e);
            toast.error("Error occurred logging in");
        }
    }

    return (
        <div className="wrapper"> {/* Centering wrapper */}
            <div className="account-page">
                <h1>Your account</h1>
                {!isAuthenticated ? (
                    // Show login form if not authenticated
                    <form onSubmit={handleValidation} className="login-form">
                        <label>
                            Email:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
}

export default Account;