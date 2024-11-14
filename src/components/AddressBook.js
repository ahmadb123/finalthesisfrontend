import React from "react";
import "../assets/styles/AddressBook.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddressBook({ address, deleteAddress }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    toast.error("You are not logged in. Please log in to view your address book.");
    navigate("/"); // Redirect to the home page
    return null;
  }

  return (
    <div className="address-book">
      <h2>ADDRESS BOOK</h2>
      {address ? (
        <div className="address-item">
          <p>{address.streetName}</p>
          <p>{address.city}</p>
          <p>{address.state}</p>
          <p>{address.postalCode}</p>
          <p>{address.country}</p>
          <button onClick={deleteAddress}>Delete</button>
        </div>
      ) : (
        <p>You have no address saved.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddressBook;
