import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ...import statements and other code

const AddToCartButton = ({ productId }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (isAddingToCart) {
      return;
    }

    setIsAddingToCart(true);

    try {
      const response = await fetch(`http://localhost:8081/addToCart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product added to cart:', data);
        alert('Product added to cart successfully');
        navigate('/userIndex');
        window.location.reload();
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <button className="btn btn-primary addToCartBtn" onClick={handleAddToCart} disabled={isAddingToCart}>
      {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
