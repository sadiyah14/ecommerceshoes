import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

function ViewProduct1() {
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get("http://localhost:8081/userProfile")
      .then((response) => {
        setUsername(response.data.Result.username);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
    
      axios
      .get('http://localhost:8081/view_Category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
    
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
  const [categories, setCategories] = useState([]);

  return (
    <div>
      <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top" style={{ backgroundColor: "#9AFEFF" }}>
        <div className="container">
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link className="navbar-brand text-brand" to="/userIndex" style={{color:"black", fontSize:'40px'}}>Be <span className="color-b" style={{color:"black"}}> Unique</span></Link>
    
          <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
            <ul className="navbar-nav">
    
              <li className="nav-item">
                <Link className="nav-link active" to="/userIndex"><i className="fa fa-home" style={{fontSize:'16px', marginLeft:"-12px"}}>&nbsp;Home</i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/userIndex/ViewBooking"><i  style={{fontSize: '20px', marginLeft: "-12px", color: "black"}}>&nbsp;View&nbsp;Booking</i></Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link " to="/userIndex/ViewProduct1"><i  style={{fontSize: '20px', marginLeft: "-12px", color: "black"}}>&nbsp;View&nbsp;Product</i></Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} to=""><i  style={{fontSize: '20px', marginLeft: "-12px", color: "black"}}>&nbsp;Logout</i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/userIndex/profile"><i className="fa fa-user" style={{ fontSize: '20px', marginLeft: "-12px", color: "black" }}>&nbsp;Profile</i></Link>
              </li>
              <li className="nav-item">
                <button style={{borderColor:"black", width:"120px", marginLeft: "-12px"}}><Link className="nav-link" to="/userIndex/viewCart"><i className="fa fa-shopping-cart" style={{ fontSize: '18px', color: "red" }}>&nbsp;Cart&nbsp;{cartCount}</i></Link></button>
              </li>
            </ul>
          </div>
    
        </div>
      </nav>
      <div className="sidebar-wrapper" data-simplebar="true">
			<ul className="metismenu" style={{marginTop:"25px"}} id="menu">
				<li>
					<Link to="/userIndex" >
						<div className="parent-icon icon-color-1"><i className="bx bx-home-alt"></i>
						</div>
						<div className="menu-title">Dashboard</div>
					</Link>
				</li>
				<li>
					<Link to="/userIndex/ViewProduct1">
						<div className="parent-icon icon-color-4"><i className="bx bx-archive"></i>
						</div>
						<div className="menu-title">All Product</div>
					</Link>
				</li>
				<li>
        {categories.map((category) => (
					<Link to={`user-product/${category._id}/`} key={category.id}>
						<div className="parent-icon icon-color-3"> <i className="fa fa-file"></i>
						</div>
						<div className="menu-title">{category.categoryname}</div>
          </Link>
          ))}
				</li>
			</ul>
		</div>
      <Outlet/>
      
      <Link to="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
  </div>
  )
}

export default ViewProduct1
