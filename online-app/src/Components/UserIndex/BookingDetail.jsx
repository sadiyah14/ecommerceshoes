import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function BookingDetail() {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8081/bookingDetail/${id}`)
      .then((response) => {
        setBookingData(response.data.bookingDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bookingData || bookingData.products.length === 0) {
    return <div>No booking data available.</div>;
  }

  const totalAmount = bookingData.products.reduce((total, item) => {
    const productPrice = item.productId ? item.productId.productprice : 0;
    const quantity = item.quantity || 0;
    return total + productPrice * quantity;
  }, 0);

  return (
    <div>
      <div className="col-md-11 grid-margin stretch-card" style={{ marginLeft: "50px", marginTop: "132px" }}>
        <div className="card">
          <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
            <h4
              style={{ marginLeft: "25px", marginTop: "10px", color: "black" }}
              className="card-title text-center"
            >
               Booking Details
            </h4>
          </div>
          <div style={{ marginTop: "30px", marginBottom: "20px" }}>
            <Link className="btn btn-primary" to="/userIndex/ViewProduct1" style={{ width: "420px" }}><i className='fa fa-tags'></i> Continue Shopping</Link>
            <button className="btn btn-success" style={{ borderColor: "black", marginLeft: "280px", width: "420px" }}>
              <i className='fa fa-certificate'></i> Total: Rs.{totalAmount}
            </button>
          </div>
          {bookingData.products.map((bookingItem, index) => {
            const productPrice = bookingItem.productId ? bookingItem.productId.productprice : 0;
            const quantity = bookingItem.quantity || 0;
            const total = productPrice * quantity;
            return (
              <div key={index} className="col-12 col-lg-12">
                <div className="card radius-10 overflow-hidden" style={{ borderColor: "black" }}>
                  <div className="card-body">
                    <div className="d-flex">
                      <div className='text-center' style={{ alignItems: "center" }}>
                        <tr>
                          <td>
                            <img style={{ width: "120px", height: "100px" }} src={`http://localhost:8081/images/${bookingItem.productId.productimg}`} alt={bookingItem.productId.productname} />
                          </td>
                          <td style={{ width: "700px" }}>
                            <h4>{bookingItem.productId.productname}</h4>
                            <hr />
                            <h5>Price: Rs.{productPrice}</h5>
                            <p>{bookingItem.productId.description}</p>
                          </td>
                          <td style={{ width: "150px" }}>
                            <h6>Quantity:&nbsp;<button className='text-center'>&nbsp;{quantity}</button></h6>
                            <h6>Total Price:&nbsp;{total}</h6>
                          </td>
                        </tr>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookingDetail;
