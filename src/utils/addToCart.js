
// src/utils/addToCart.js

export const addToCart = async (itemId, userId) => {
  const apiUrl = 'http://localhost:8080';
  try {
    const response = await fetch(`${apiUrl}/api/cart/add-item`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userId,
      },
      body: JSON.stringify({ id: itemId }),
    });
    if (response.ok) {
      // Handle success (e.g., show a success message)
    } else {
      // Handle failure
    }
  } catch (e) {
    console.error("Error adding item to cart:", e);
    // Handle error
  }
};