// src/pages/ViewItem.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../assets/styles/ViewItem.css"; // Create a CSS file for styling if needed

const apiUrl = 'http://localhost:8080';

function ViewItem() {
  const { id } = useParams(); // Extract the item ID from the URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/items/${id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          console.error('Error fetching item details');
        }
      } catch (e) {
        console.error('Error fetching item details:', e);
      }
    };
    fetchItemDetails();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-item-page">
      <h1>{item.name}</h1>
      <div className="item-image">
        <img src={`${apiUrl}${item.image}`} alt={item.name} />
      </div>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      {/* Add any other item details you wish to display */}
    </div>
  );
}

export default ViewItem;
