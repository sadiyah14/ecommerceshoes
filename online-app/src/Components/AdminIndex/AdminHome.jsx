import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function AdminHome() {
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
      axios
      .get("http://localhost:8081/userCount")
      .then((res) => {
        setUserCount(res.data[0].user);
      })
      .catch((err) => console.log(err));
    
      axios
      .get("http://localhost:8081/bookingCount")
      .then((res) => {
        setBookingCount(res.data[0].booking);
      })
      .catch((err) => console.log(err));
    
      axios
      .get("http://localhost:8081/productCount")
      .then((res) => {
        setProductCount(res.data[0].product);
      })
      .catch((err) => console.log(err));
    
  }, []);

  return (
    <div>
      <div id="content">
        <div id="content-header" style={{ marginTop: "-52px" }}>
          <div id="breadcrumb">
            {" "}
            <Link to="/adminIndex" title="Go to Home" className="tip-bottom">
              <i className="icon-home"></i> Home
            </Link>
          </div>
        </div>
        <div className="container-fluid">
          <div className="quick-actions_homepage">
            <ul className="quick-actions">
            <li style={{width:"300px", height:"150px", backgroundColor:"#F89880	"}}>
                {" "}
                <Link to="/adminIndex/reg_user">
                  {" "}
                  <i className="icon-people" style={{marginTop:"30px"}}></i>  <h5>Total Customer</h5>{" "}
                </Link>{" "}
                <h4>{userCount}</h4>
              </li>
              <li style={{width:"300px", height:"150px", backgroundColor:"#F89880	"}}>
                {" "}
                <Link to="/adminIndex/adminViewBooking">
                  {" "}
                  <i className="icon-shopping-bag" style={{marginTop:"30px"}}></i>  <h5>Total Booking</h5>
                </Link>{" "}
                <h4>{bookingCount}</h4>
              </li>
              <li style={{width:"300px", height:"150px", backgroundColor:"#F89880	"}}>
                {" "}
                <Link to="/adminIndex/view_Product">
                  {" "}
                  <i className="icon-web" style={{marginTop:"30px"}}></i> <h5>Total Product</h5> {" "}
                </Link>{" "}
                <h4>{productCount}</h4>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
