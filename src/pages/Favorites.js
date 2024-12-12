import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart, FaCartPlus } from 'react-icons/fa'; // Add any additional icons if needed
import '../assets/styles/Favorites.css'; // Import the CSS file

const apiUrl = 'http://localhost:8080';

function Favorites() {
  const [favorites, setFavorites] = useState([]); // array of favorite item details
  const navigate = useNavigate();
  const userId = localStorage.getItem('jwtToken');
  const role = localStorage.getItem('userRole') || 'guest';
  const [isGuest, setIsGuest] = useState(role === 'guest');

  useEffect(() => {
    if (!isGuest) {
      fetchFavorites();
    }
  }, [isGuest]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/favorites/get-favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userId,
        },
      });
      if (response.ok) {
        const itemIds = await response.json();
        const favoriteDetails = await Promise.all(itemIds.map(fetchFavoriteDetails));
        setFavorites(favoriteDetails.filter(item => item)); // Filter out any null/undefined responses
      } else {
        console.error('Error fetching favorites');
        toast.error("Error fetching favorites");
      }
    } catch (e) {
      console.error('Error fetching favorites:', e);
      toast.error("Error fetching favorites");
    }
  };
  

  const fetchFavoriteDetails = async (itemId) => {
    try {
      const response = await fetch(`${apiUrl}/api/items/${itemId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error(`Error fetching details for itemId: ${itemId}`);
        return null; // Return null if the item fetch fails
      }
    } catch (e) {
      console.error(`Error fetching details for itemId: ${itemId}`, e);
      return null;
    }
  };
  

  return (
    <div>
      <h1>Your Favorites</h1>
      {isGuest ? (
        <p>Please log in to view favorites or add favorites</p>
      ) : (
        <ul className="favorites-container">
        {favorites.map((item, index) => (
            <li key={index} className="favorite-item">
            {item ? (
                <>
                <h3>{item.name}</h3>
                <div className="favorite-item-image">
                    <img src={`${apiUrl}${item.image}`} alt={item.name} />
                </div>
                <p>${item.price}</p>
                <div className="button-container">
                    <button onClick={() => navigate(`/view-item/${item.id}`)}>View Item</button>
                </div>
                </>
            ) : (
                <p>Item details could not be loaded</p>
            )}
            </li>
        ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
}

export default Favorites;