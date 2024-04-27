import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function AdminBookingDetail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8081/adminbookingDetail/${id}`)
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  return (
    <div>
      <div className="col-md-11 grid-margin stretch-card" style={{ marginLeft: "50px", marginTop: "32px" }}>
        <div className="card">
          <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
            <h4
              style={{ marginLeft: "25px", marginTop: "10px", color: "black" }}
              className="card-title text-center"
            >
              <i className="fa fa-shopping-cart"> </i> Booking Details
            </h4>
          </div>
          <div className='text-center' style={{ marginTop: "30px", marginBottom: "20px" }}>
            <button className="btn btn-success" style={{ borderColor: "black", width: "420px" }}>
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
          <div style={{ marginLeft: '95px' }} className="col-lg-10 border">
        <section className="section" style={{ marginBottom: "32px"}}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center" style={{color:"brown"}}>Customer Details</h4>
                  <hr/>
                      <table className='table'>
                      <div className='row'>
                      <div className='col-md-6' style={{marginLeft:"50px"}}>
                        <tr>
                          <h6>Name:</h6>
                          <td><strong style={{color:"black"}}>{bookingData.user.firstname} {bookingData.user.lastname}</strong></td>
                        </tr>
                        <tr>
                          <h6>Email Id:</h6>
                              <td  style={{ position: 'relative' }}><strong style={{ color: "black" }}>
                              <input
                                type="text"
                                name="name"
                                value={showPassword ? bookingData.user.email : "********"}
                                id="exampleInputUsername1"
                                autoComplete="off"
                                readOnly
                              />
                              <span
                                style={{
                                position: 'absolute',
                                right: '2px',
                                top: '53%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer', backgroundColor:"green",
                                padding:"11px", color:"red",
                                }}
                                className={`input-group-text toggle-password-2 ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                                onClick={togglePasswordVisibility}
                            ></span>
                                </strong></td>
                        </tr>
                        <tr>
                          <h6>Address:</h6>
                          <td><strong style={{color:"black"}}>{bookingData.user.address}</strong></td>
                        </tr>
                        <tr>
                          <h6>Contact:</h6>
                          <td  style={{ position: 'relative' }}><strong style={{ color: "black" }}>
                              <input
                                type="text"
                                name="name"
                                value={showPassword1 ? bookingData.user.contact : "********"}
                                id="exampleInputUsername1"
                                autoComplete="off"
                                readOnly
                              />
                              <span
                                style={{
                                position: 'absolute',
                                right: '2px',
                                top: '53%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer', backgroundColor:"green",
                                padding:"11px", color:"red",
                                }}
                                className={`input-group-text toggle-password-2 ${showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"}`}
                                onClick={togglePasswordVisibility1}
                            ></span>
                                </strong></td>
                        </tr>
                      </div>
                      <div className='col-md-4'>
                      <img style={{ width: "120px", height: "100px" }} src={`http://localhost:8081/images/${bookingData.user.image}`} />
                      </div>
                      </div>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBookingDetail;
