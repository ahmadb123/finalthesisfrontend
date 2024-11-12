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
    const handleEditAddress = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${apiUrl}/api/auth/update-address`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    streetName,
                    city,
                    state,
                    postalCode,
                    country
                }),
            });
            if(response.ok){
                toast.success("Address updated successfully");
                navigate("/account");
            }else{
                toast.error("Failed to update address");
                navigate("/account");
            }
        }catch(e){
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
                        type ="text"
                        valye={streetName}
                        onChange={(e) => setStreetName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input 
                        type ="text"
                        valye={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input 
                        type ="text"
                        valye={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Postal Code</label>
                    <input 
                        type ="text"
                        valye={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input 
                        type ="text"
                        valye={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <button type="submit">Update Address</button>
            </form>
        </div>
    );
}

export default EditAddress;