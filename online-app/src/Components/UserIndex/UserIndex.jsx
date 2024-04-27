import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";

function UserIndex() {
  const [cartCount, setCartCount] = useState(0);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    // Fetch user profile data to get the username
    axios.get("http://localhost:8081/userProfile")
      .then((response) => {
        setUsername(response.data.Result.username);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        // Handle error, e.g., redirect to login page
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/home")
      .then((result) => {
        console.log(result);
        if (result.data && result.data.Status === "Success") {
          if (result.data.role === "user") {
            navigate("/UserIndex");
          } else {
            navigate("/adminIndex");
          }
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
    
      axios
      .get('http://localhost:8081/cartCount', { withCredentials: true })
      .then((res) => {
        setCartCount(res.data.cart.uniqueProductCount);
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
      <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top" style={{ backgroundColor: "#9AFEFF" }}>
        <div className="container">
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
          <Link className="navbar-brand text-brand" to="/userIndex" style={{color:"black", fontSize:'40px'}}>Be<span className="color-b" style={{color:"black"}}> Unique</span></Link>
          <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
            <ul className="navbar-nav">
    
              <li className="nav-item">
                <Link className="nav-link active" to="/userIndex"><i  style={{fontSize:'20px', marginLeft:"-12px"}}>&nbsp;Home</i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="userIndex/ViewBooking"><i style={{fontSize:'20px', marginLeft:"-12px"}}>&nbsp;View&nbsp;Booking</i></Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link " to="userIndex/ViewProduct1"><i  style={{fontSize:'20px', marginLeft:"-12px"}}>&nbsp;View&nbsp;Product</i></Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} to=""><i  style={{fontSize:'20px', marginLeft:"-12px", }}>&nbsp;Logout</i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="userIndex/profile"><i  style={{ fontSize: '20px', marginLeft: "-12px", color: "black" }}>&nbsp;Profile</i></Link>
              </li>
              <li className="nav-item">
                <button style={{borderColor:"black", width:"120px", marginLeft: "-12px"}}><Link className="nav-link" to="userIndex/viewCart"><i className="fa fa-shopping-cart" style={{ fontSize: '18px', color: "b" }}>&nbsp;Cart&nbsp;{cartCount}</i></Link></button>
              </li>
            </ul>
          </div>
    
        </div>
      </nav>
      <Outlet/>
      
      <Link to="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
  </div>
  )
}

export default UserIndex