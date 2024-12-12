import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/ViewItem.css";
import { addToCart } from '../utils/addToCart';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = "http://localhost:8080";

function ViewItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const userId = localStorage.getItem("jwtToken");
  const [isAnimating, setIsAnimating] = useState(false);
  const role = localStorage.getItem('userRole') || 'guest';

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/items/${id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          console.error("Error fetching item details");
        }
      } catch (e) {
        console.error("Error fetching item details:", e);
      }
    };
    fetchItemDetails();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleAddToBag = async () => {
    await addToCart(item.id, userId);
    setIsAnimating(true); // Start animation
    setTimeout(() => setIsAnimating(false), 1000); // End animation after 1 second
    toast.success('Item added to cart');
  };

  const handleAddToFavorites = async () => {
    if(role === 'guest') {
      toast.error('Please log in to add items to favorites');
      return;
    }else{
      try {
        const response = await fetch(`${apiUrl}/api/favorites/add-favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + userId,
          },
          body: JSON.stringify({id: item.id}),       
        });
        if (response.ok) {
          toast.success("Item added to favorites");
        } else {
          console.error("Error adding item to favorites");
        }
      } catch (e) {
        console.error("Error adding item to favorites:", e);
      }
    }
  };

  return (
    <div className="view-item-page">
      <div className="item-container">
        <div className={`item-image ${isAnimating ? 'animate' : ''}`}>
          <img src={`${apiUrl}${item.image}`} alt={item.name} />
        </div>
        <div className="item-details">
          <h1>{item.name}</h1>
          <p className="item-price">${item.price}</p>
          <div className="item-actions">
            <button onClick={handleAddToBag}>Add to Bag</button>
            <button onClick={handleAddToFavorites} className="add-to-favorites">Add to Favorites</button>
            <button className="share">Share</button>
          </div>
          <div className="item-description">
            <h2>Details</h2>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewItem;