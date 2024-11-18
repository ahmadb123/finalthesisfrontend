// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "../assets/styles/HomePage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = 'http://localhost:8080';

function HomePage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [animatedItemId, setAnimatedItemId] = useState(null); // State to track animated item
  const [showCart , setShowCart] = useState(false);
  const userId = localStorage.getItem('jwtToken');

  const getCurrentItems = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/items`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const data = await response.json();
            setItems(data);
        } else {
            console.error('Error fetching items');
            navigate('/login');
        }
    } catch(e) {
        console.error("Error fetching items:", e);
    }
  };

  const getCartData = async () => {
    try{
        const response = await fetch(`${apiUrl}/api/cart/get-cart`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userId
        }
    });
        if(response.ok){
            const data = await response.json();
            setCart({ items: data.items, total: data.total, count: data.count });
        }else{
            console.error('Error fetching cart items');
            navigate('/login');
        }
    }catch(e){
        console.error("Error fetching cart items:", e);
        } 
    };

  // Function to handle "Add to Cart"
  const addToCart = async (item) => {
    try {
        const response = await fetch(`${apiUrl}/api/cart/add-item`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userId
            },
            body: JSON.stringify(item),
        });
        if(response.ok){
            toast.success('Item added to cart');
            setAnimatedItemId(item.id); // Trigger animation for the item
            setTimeout(() => setAnimatedItemId(null), 1000); // Clear animation state after 1 second
        } else {
            toast.error('Error adding item to cart');
            console.error('Error adding item to cart');
        }
    } catch (e) {
        console.error("Error adding item to cart:", e);
    }
  };

  useEffect(() => {
    getCurrentItems();
    getCartData();
  }, []);

  return (
    <div className="homepage">
      <div className="navbar">
        <div className="navbar-content">
          <span className="brand-name">Tezkar</span>
          <div className="icons">
            <div className="account-icon" onClick={() => navigate('/account')}>
              <FaUserCircle />
            </div>
            <div 
               className="cart-icon" 
               onMouseEnter={() => setShowCart(true)} 
               onMouseLeave={() => setShowCart(false)}
            >
            <FaShoppingCart />
            {showCart && (
                <div className='cart-preview'>
                    <h3>Your Cart</h3>
                    {cart.items.length > 0 ?(
                        <div> 
                            {cart.items.map((item, index) => (
                                <div key={index} className="cart-preview-item">
                                <p>{item.name} x {item.quantity}</p>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <hr />
                    <p>Total: ${cart.total.toFixed(2)}</p>
                    <button onClick={() => navigate('/cart-page')}>View Cart</button>
                    </div>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="items-container">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`item-box ${animatedItemId === item.id ? 'animate' : ''}`}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
}

export default HomePage;
