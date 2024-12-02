import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/CartPage.css";
const apiUrl = "http://localhost:8080";

function CartPage() {
  const navigate = useNavigate();
  const userIdToken = localStorage.getItem("jwtToken"); // Get user ID token

  // Redirect to homepage if not logged in
  useEffect(() => {
    if (!userIdToken) {
      toast.error("Please login to view your cart");
      navigate("/homePage");
    }
  }, [userIdToken, navigate]);

  // Cart state variables
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch cart items
  useEffect(() => {
    const getCurrentItems = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/cart/get-cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userIdToken,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
          setItems(data.items); // Set items array
          setCount(data.count); // Set total item count
          setTotal(data.total); // Set total price
        } else {
          toast.error("Error fetching cart items");
          navigate("/homePage");
        }
      } catch (e) {
        console.error("Error fetching cart items:", e);
      }
    };

    getCurrentItems();
  }, [userIdToken, navigate]);

  return (
    <div className="cart-page">
      <ToastContainer />
      <div className="cart-container">
        {/* Left Column */}
        <div className="cart-left">
          <h3>Hello, {userId}</h3>
          <h1>Your Bag</h1>
          <p>
            Total Items: <strong>{count}</strong>
          </p>
          <p>
            Total Price: <strong>${total.toFixed(2)}</strong>
          </p>
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={item._id || index} className="cart-item">
              <img src={`${apiUrl}${item.image}`} alt={item.name} className="item-img" />
              <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price per Item: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="cart-right">
          <h3>Order Summary</h3>
          <p>Items: {count}</p>
          <p>Subtotal: ${total.toFixed(2)}</p>
          <p>Delivery: $4.99</p>
          <h4>
            Total: <strong>${(total + 4.99).toFixed(2)}</strong>
          </h4>
          <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
