import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ViewCart() {
  const [cartData, setCartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/view_Cart', {
      method: 'GET',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.Status === 'Success') {
        setCartData(data.cart);
      } else {
        console.error('Failed to fetch cart data');
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });

  }, []);

  if (!cartData) {
    return <div><section className="section-testimonials section-t8 nav-arrow-a">
    <div className="container">
    <div id="testimonial-carousel" className="swiper">
      <div className="swiper-wrapper">
        <div className="carousel-item-a swiper-slide">
          <div className="testimonials-box">
            <div className="row">
              <div className="col-sm-12 col-md-12 card" style={{height:"320px", borderColor:"ActiveBorder"}}>
                <div className="testimonial-ico">
                  <h2 style={{marginTop:"120px"}}><i className="fa fa-shopping-cart"></i>  Your Cart is Empty</h2>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
    <div className="testimonial-carousel-pagination carousel-pagination"></div>
    </div>
    </section></div>;
  }
  if (!cartData || !cartData.products || cartData.products.length === 0) {
    return (
      <section className="section-testimonials section-t8 nav-arrow-a">
<div className="container">
<div id="testimonial-carousel" className="swiper">
  <div className="swiper-wrapper">
    <div className="carousel-item-a swiper-slide">
      <div className="testimonials-box">
        <div className="row">
          <div className="col-sm-12 col-md-12 card" style={{height:"320px", borderColor:"ActiveBorder"}}>
            <div className="testimonial-ico">
              <h2 style={{marginTop:"120px"}}><i className="fa fa-shopping-cart"></i>  Your Cart is Empty</h2>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </div>
</div>
<div className="testimonial-carousel-pagination carousel-pagination"></div>
</div>
</section>
    );
  }
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Cart Item?");
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteCartItem/${id}`, {
          withCredentials: true, // Ensure credentials are sent with the request
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            navigate('/userIndex');
            window.location.reload();
            setCartData(cartData.filter((product) => product._id !== id));
          } else {
            alert('Error');
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const totalPrice = cartData.products.reduce((total, product) => {
    return total + product.productId.productprice * product.quantity;
  }, 0);
  return (
    <div>
      <div className="col-md-11 grid-margin stretch-card" style={{marginLeft:"50px", marginTop:"132px"}}>
          <div className="card">
            <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
              <h4
                style={{ marginLeft: "25px", marginTop: "10px", color: "black" }}
                className="card-title text-center"
              >
                <i className="fa fa-shopping-cart"> </i> View Cart
              </h4>
            </div>
              <div style={{marginTop:"30px", marginBottom:"20px"}}>
                <Link className="btn btn-primary" style={{color:"black", background:'white'}}to="/userIndex/ViewProduct1"><i className='fa fa-tags'></i> Continue Shopping</Link>
                <Link className="btn btn-primary" style={{marginLeft:"340px", color:"black", background:'white'}} to={`/userIndex/checkout/${cartData._id}`}><i className='fa fa-credit-card'></i> Buy Now</Link>
                <button className="btn btn-success" style={{borderColor:"black",marginLeft:"280px", width:"220px", color:"black", background:'white'}}><i className='fa fa-certificate'></i> Total: {totalPrice}</button>
              </div>
              {cartData.products.map(product => {
                const total = product.productId.productprice * product.quantity; // Calculate total price
                return (
                <div key={product.productId._id} className="col-12 col-lg-12">
                  <div className="card radius-10 overflow-hidden" style={{borderColor:"black"}}>
                    <div className="card-body">
                      <div className="d-flex">
                        <div className='text-center' style={{ alignItems: "center" }}>
                          <tr>
                            <td>
                              <img style={{ width: "120px", height: "100px" }} src={`http://localhost:8081/images/${product.productId.productimg}`} alt={product.productId.productname} />
                            </td>
                            <td style={{ width: "700px"}}>
                              <h4>{product.productId.productname}</h4>
                                <hr />
                              <h5>Price: Rs.{product.productId.productprice}</h5>
                              <p>{product.productId.description}</p>
                            </td>
                            <td style={{ width: "150px"}}>
                              <h6>Quantity:&nbsp;<button className='text-center'>&nbsp;{product.quantity}</button></h6>
                                <h6>Total Price:&nbsp;{total}</h6>
                            </td>
                            <td>
                              <button
                                onClick={() => handleDelete(product._id)}
                                
                              >
                                <i style={{color:"black", background:'white'}}> Remove</i>
                              </button>
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

export default ViewCart;
