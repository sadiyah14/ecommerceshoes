import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";

function AdminIndex() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/home")
      .then((result) => {
        console.log(result);
        if (result.data && result.data.Status === "Success") {
          if (result.data.role === "admin") {
            navigate("/adminIndex");
          } else {
            navigate("/UserIndex");
          }
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div id="header"></div>
      <div id="sidebar" style={{ marginTop: "-50px", height: "60px" ,background:'black'}}>
        <Link to="#" className="visible-phone">
          <i className="icon icon-home"></i> Dashboard
        </Link>
        <ul>
          <li className="active">
            <Link to="/adminIndex">
              <i className="icon icon-home"></i>{" "}
              <span style={{ fontSize: "35px" , marginLeft:'50px'}}>Be Unique</span>
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/adminIndex">
               <span style={{ fontSize: "25px" , marginLeft:'50px'}}>Home</span>
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="adminIndex/reg_user">
               <span style={{ fontSize: "25px" , marginLeft:'50px'}}>View User</span>
            </Link>{" "}
          </li>
          <li>
            <Link to="adminIndex/adminViewBooking">
               <span style={{ fontSize: "25px" , marginLeft:'50px'}}>View Booking</span>
            </Link>
          </li>
          
          <li className="submenu">
            {" "}
            <Link to="#">
               <span style={{ fontSize: "25px" , marginLeft:'50px'}}>Product</span>
            </Link>
            <ul>
              <li>
                <Link to="adminIndex/addProduct">Add Product</Link>
              </li>
              <li>
                <Link to="adminIndex/view_Product">View Product</Link>
              </li>
            </ul>
          </li>
          <li className="submenu">
            {" "}
            <Link to="#">
              <span style={{ fontSize: "25px" , marginLeft:'50px'}}> Category</span>
            </Link>
            <ul>
              <li>
                <Link to="adminIndex/add_category">Add Category</Link>
              </li>
              <li>
                <Link to="adminIndex/view_Category">View Category</Link>
              </li>
            </ul>
          </li>
          
          
          <li>
            <Link to="adminIndex/change">
               <span style={{ fontSize: "25px" , marginLeft:'50px'}}>Change Password</span>
            </Link>
          </li>
          <li>
            <Link to="" onClick={handleLogout}>
               <span style={{ fontSize: "25px" , marginLeft:'50px'}}>Log-Out</span>
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
      <div className="row-fluid" style={{position:'fixed',bottom:'-10px',zIndex:'1000!important'}}>
        <div id="footer" className="span12">
          {" "}
          2012 &copy; Marutii Admin. Brought to you by{" "}
          <Link to="http://themedesigner.in/">Themedesigner.in</Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default AdminIndex;
