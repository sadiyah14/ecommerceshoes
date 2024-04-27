import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Checkout() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const currentDate = new Date().toISOString().split('T')[0];
    const [cartData, setCartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [bookingId, setBookingId] = useState('');
    
    useEffect(() => {
        axios
        .get(`http://localhost:8081/cartCheckout/${id}`)
        .then((response) => {
          setCartData(response.data.cart);
          setBookingId(response.data.bookingId); // Set the Booking Id received from the server
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>; // Loading indicator
    }
  
    if (error) {
      return <div>Error occurred: {error.message}</div>; // Error message
    }
  
    const totalPrice = cartData.products.reduce((total, product) => {
      return total + product.productId.productprice * product.quantity;
    }, 0);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    const togglePasswordVisibility1 = () => {
      setShowPassword1(!showPassword1);
    };
  return (
    <div>
        <div className="col-md-8 grid-margin stretch-card" style={{marginLeft:"220px", marginTop:"132px"}}>
          <div className="card">
            <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
              <h4
                style={{ marginLeft: "25px", marginTop: "10px", color: "black" }}
                className="card-title text-center"
              > <i className='fa fa-star'></i> Confirm Booking Details
              </h4>
            </div>
            <div className="card-body">
              <form className="forms-sample" style={{marginLeft:"15px"}}>
                <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="exampleInputUsername1">Booking Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={bookingId}
                    id="exampleInputUsername1"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="exampleInputConfirmPassword1">Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={cartData.userId.username}
                    id="exampleInputConfirmPassword1"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col-md-6 form-group mb-3">
                  <label htmlFor="exampleInputConfirmPassword2">Booking Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={currentDate}
                    id="exampleInputConfirmPassword2"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col-md-6 form-group" style={{ position: 'relative' }}>
                  <label htmlFor="exampleInputUsername1">Email Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={showPassword ? cartData.userId.email : "********"}
                    id="exampleInputUsername1"
                    autoComplete="off"
                  />
                  <span
                    style={{
                    position: 'absolute',
                    right: '10px',
                    top: '53%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', backgroundColor:"green",
                    padding:"11px", color:"red"
                    }}
                    className={`input-group-text toggle-password-2 ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                    onClick={togglePasswordVisibility}
                ></span>
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="exampleInputConfirmPassword1">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={cartData.userId.city}
                    id="exampleInputConfirmPassword1"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col-md-6 form-group mb-3" style={{ position: 'relative' }}>
                  <label htmlFor="exampleInputConfirmPassword2">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={showPassword1 ? cartData.userId.contact : "********"}
                    id="exampleInputConfirmPassword2"
                    autoComplete="off"
                  /> 
                  <span
                    style={{
                    position: 'absolute',
                    right: '10px',
                    top: '69%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', backgroundColor:"green",
                    padding:"11px", color:"red"
                    }}
                    className={`input-group-text toggle-password-2 ${showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"}`}
                    onClick={togglePasswordVisibility1}
                ></span>
                </div>
                <div className="col-md-12 form-group">
                  <label htmlFor="exampleInputConfirmPassword1">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={cartData.userId.address}
                    id="exampleInputConfirmPassword1"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="col-md-12 form-group mb-3">
                  <label htmlFor="exampleInputConfirmPassword2">Total</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={totalPrice}
                    id="exampleInputConfirmPassword2"
                    autoComplete="off"
                    required
                  />
                </div>
                </div>

                <Link to={`/userIndex/payment/${cartData._id}`}
                  type="submit"
                  className="btn btn-primary mr-1"
                >
                  Confirm
                </Link>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Checkout
