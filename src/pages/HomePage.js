// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaShoppingCart, FaSearch , FaTimes} from 'react-icons/fa';
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
  const [showSearch, setShowSearch] = useState(false);
  const [recentSearch, setRecentSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items
  const [searchSuggestions, setSearchSuggestions] = useState({
    recent: [],
    popular: ['crossbody', 'wallet', 'backpack', 'boots'],
    suggested: [],
  });
  const userId = localStorage.getItem('jwtToken');

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if(showSearch){
      setRecentSearch('');
    }
  };

  
  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setRecentSearch(searchInput);

    if (event.key === "Enter") {
      onSearch(searchInput);
    }

    // Dynamically update suggestions based on the input
    setSearchSuggestions((prev) => ({
      ...prev,
      suggested: items
        .filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 5),
    }));
  };


  const onSearch = (searchInput) => {
    setRecentSearch(searchInput);
    // Save the search in recent searches
    setSearchSuggestions((prev) => {
      const updatedRecent = [
        searchInput,
        ...prev.recent.filter((item) => item !== searchInput),
      ].slice(0, 5);
      // Save to localStorage
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
      return {
        ...prev,
        recent: updatedRecent,
      };
    });
    /* 
    TODO: 
    Render the page to show the desired item when search button
    */ 
    // Filter items
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.description.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  
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
            setFilteredItems(data);
            setSearchSuggestions((prev) => ({
              ...prev,
              suggested: data.slice(0,5),
            }));
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
            body: JSON.stringify({ id: item.id }), // Send only the item ID
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
  
  const  removeItemFromCart = async (item) => {
    try{
      const response = await fetch(`${apiUrl}/api/cart/remove-item/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userId,
        },
      });
      if(response.ok){
        toast.success('Item removed from cart');
        getCartData();
      }else{
        toast.error('Error removing item from cart');
        console.error('Error removing item from cart');
      }
    }catch(e){
      console.error('Error removing item from cart:', e);
    }
  };
  

  useEffect(() => {
    getCurrentItems();
    getCartData();

    // Load recent searches from localStorage
    const storedRecentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setSearchSuggestions((prev) => ({
      ...prev,
      recent: storedRecentSearches,
    }));
  }, []);

  return (
    <div className="homepage">
      <div className="navbar">
        <div className="navbar-content">
          <span className="brand-name">Tezkar</span>
          <div className="icons">
          <div className="search-icon" onClick={toggleSearch}>
        {showSearch ? <FaTimes /> : <FaSearch />}
      </div>
      {showSearch && (
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={recentSearch}
                onChange={(e) => handleSearch(e)}
                onKeyDown={(e) => handleSearch(e)}
              />
              <div className="search-suggestions">
                <h4>Suggestions:</h4>
                {searchSuggestions.suggested.length > 0 ? (
                  <ul>
                    {searchSuggestions.suggested.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => onSearch(item.name)}
                        className="suggestion-item"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No suggestions available</p>
                )}
                <h4>Recent Searches:</h4>
                <ul>
                  {searchSuggestions.recent.map((recent, index) => (
                    <li
                      key={index}
                      onClick={() => onSearch(recent)}
                      className="recent-item"
                    >
                      {recent}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

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
                                <button className='remove-item' onClick={() => removeItemFromCart(item)}>Remove</button>
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
          <div className="item-image">
            <img src={`${apiUrl}${item.image}`} alt={item.name} className="item-img" />
          </div>
          <div className="item-desc">
            <p>{item.description}</p>
          </div>
          <p>${item.price}</p>
          <div className="button-container">
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button onClick={() => navigate(`/view-item/${item.id}`)}>View Item</button>
              </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  </div>
  );
}

export default HomePage;
