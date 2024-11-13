import React, { useState } from "react";
import "../assets/styles/EditAccount.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = 'http://localhost:8080';

function EditAddress(){
    const navigate = useNavigate();
    const [streetName, setStreetName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem('jwtToken');

    const handleEditAddress = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");
        if(!token){
            toast.error("You are not logged in. Please log in to update your address.");
            navigate("/login");
            return;
        }

        const addressData = {
            streetName,
            city,
            state,
            postalCode,
            country
        };

        try{
            const response = await fetch(`${apiUrl}/api/auth/update-address`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    'Authorization': 'Bearer ' + jwtToken 
                },
                body: JSON.stringify(addressData),
            });

            if(response.ok){
                toast.success("Address updated successfully");
                navigate("/account");
            } else {
                const errorData = await response.json();
                toast.error(`Failed to update address: ${errorData.message || response.statusText}`);
            }
        } catch(error){
            console.error("Error occurred updating address:", error);
            toast.error("Error occurred updating address");
        }
    };

    return(
        <div className="edit-address">
            <h2>Edit Address</h2>
            <form onSubmit={handleEditAddress}>
                <div className="form-group">
                    <label>Address Line</label>
                    <input 
                        type="text"
                        value={streetName}
                        onChange={(e) => setStreetName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input 
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input 
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Postal Code</label>
                    <input 
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input 
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <button type="submit">Update Address</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default EditAddress;
