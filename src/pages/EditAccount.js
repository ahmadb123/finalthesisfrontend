import React, { useState, useEffect } from "react";
import "../assets/styles/EditAccount.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../components/Breadcrumb";
const apiUrl = 'http://localhost:8080';

function EditAddress(){
    const navigate = useNavigate();
    const [streetName, setStreetName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const getCurrentAddress = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/auth/get-address`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data && Object.keys(data).length > 0) {
                        // Address exists
                        setStreetName(data.streetName || "");
                        setCity(data.city || "");
                        setState(data.state || "");
                        setPostalCode(data.postalCode || "");
                        setCountry(data.country || "");
                    } else {
                        // Address is null or empty
                        clearAddressFields();
                    }
                } else {
                    // Handle error responses without showing an error toast
                    clearAddressFields();
                }
            } catch (e) {
                console.error("Error fetching address data:", e);
         }
        };
        getCurrentAddress();
    }, [jwtToken]);

    const clearAddressFields = () => {
        setStreetName("");
        setCity("");
        setState("");
        setPostalCode("");
        setCountry("");
    };

    const deleteAddress = async () =>{
        try{
            const response = await fetch(`${apiUrl}/api/auth/delete-address`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwtToken
                },
            });
            if(response.ok){
                toast.success("Address deleted successfully");
                clearAddressFields();
                setIsEditing(false);
            }else{
                const errorData = await response.json();
                toast.error(`Failed to delete address: ${errorData.message || response.statusText}`);
            }
        }catch(e){
            console.error("Error deleting address:", e);
            toast.error("Error deleting address");
        }
    };

    const handleEditAddress = async (e) => {
        e.preventDefault();

        if(!streetName || !city || !state || !postalCode || !country){
            toast.error("Please fill in all fields");
            return null;
        }

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
                setIsEditing(false);
            } else {
                const errorData = await response.json();
                toast.error(`Failed to update address: ${errorData.message || response.statusText}`);
            }
        } catch(error){
            console.error("Error occurred updating address:", error);
            toast.error("Error occurred updating address");
        }
    };

    const addressExists = streetName || city || state || postalCode || country;

    return (
        <div className="edit-address">
            <h2>ADDRESS BOOK</h2>
            {
                !isEditing ? (
                    <div>
                        {addressExists ? (
                            <div className="address-display">
                                <p>{streetName}</p>
                                <p>{city}</p>
                                <p>{state}</p>
                                <p>{postalCode}</p>
                                <p>{country}</p>
                                <div className="actions">
                                    <button onClick={() => setIsEditing(true)}>Edit Address</button>
                                    <button onClick={deleteAddress}>Remove</button>
                                </div>
                                <p className="default-label">Default</p>
                            </div>
                        ) : (
                            <div className="add-new-address" onClick={() => { clearAddressFields(); setIsEditing(true); }}>
                                <div className="add-icon">+</div>
                                <span>Add Address</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <button className="modal-close-button" onClick={() => setIsEditing(false)}>✖</button>
                            <h2 className="modal-title">Edit Address</h2>
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
                                <div className="modal-buttons">
                                    <button type="submit" className="modal-save-button">Update Address</button>
                                    <button type="button" className="modal-cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            <ToastContainer />
        </div>
    );
}

export default EditAddress;
