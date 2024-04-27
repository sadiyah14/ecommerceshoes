import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookingButton = ({ cartId }) => {
  const [isAddBooking, setIsAddBooking] = useState(false);
  const navigate = useNavigate();

  const handleAddBooking = async () => {
    if (isAddBooking) {
      return;
    }

    setIsAddBooking(true);

    try {
      const response = await fetch(`http://localhost:8081/addbooking/${cartId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Booking created successfully:', data);
        alert('Booking created successfully');
        navigate('/userIndex');
        window.location.reload();
      } else {
        console.error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsAddBooking(false);
    }
  };

  return (
    <button className="btn btn-primary addToBookingBtn" onClick={handleAddBooking} disabled={isAddBooking}>
      {isAddBooking ? 'Submit...' : 'Submit'}
    </button>
  );
};

export default AddBookingButton;
