import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import axios from "axios";

function Index() {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <div>
         <div className="box-collapse">
    <div className="title-box-d">
      <h3 className="title-d">Search Property</h3>
    </div>
  </div>
  <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top" style={{ backgroundColor: "#9AFEFF" }}>
    <div className="container">
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Link className="navbar-brand text-brand" to="/"  style={{color:"black"}}>Be <span className="color-b" style={{color:"black"}}> Unique</span></Link>

      <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
        <ul className="navbar-nav">

          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " to="/about">About</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " to="/contact">Contact</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " to="/user_login"><i className="fa fa-sign-in" style={{fontSize:'24px',color:'black'}}></i> User Login</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " to="/admin_login"><i className="fa fa-sign-in" style={{fontSize:'24px',color:'black'}}></i> Admin Login</Link>
          </li>
          
        </ul>
      </div>

    </div>
  </nav>
  <Outlet/>
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="copyright-footer">
            <p className="copyright color-text-a">
              &copy; Copyright
              <span className="color-a"> {year} <Link>Be Unique</Link></span> All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <Link to="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
  </div>
  )
}

export default Index