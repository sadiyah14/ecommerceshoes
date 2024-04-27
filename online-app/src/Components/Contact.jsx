import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div>
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">Contact US</h1>
                <span className="color-text-a">
                  <h6>Connect With Us on Social Media:</h6>
                  Follow us on Facebook, Twitter, and Instagram to stay updated
                  with our latest offers, promotions, and fresh arrivals. We
                  love hearing from our customers, so don't hesitate to tag us
                  in your culinary creations!
                </span>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-box d-flex justify-content-lg-end"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <div>
        <div id="content-header" style={{ marginTop: "5px" }}>
        <div className="container-fluid">
          <div className="quick-actions_homepage">
            <ul className="quick-actions">
            <li style={{width:"250px", height:"150px", backgroundColor:"#9AFEFF	"}}>
                {" "}
                <Link to="#">
                  {" "}
                  <i className="fa fa-phone" style={{marginTop:"30px", fontSize:"32px"}}></i>  <h5>Contact</h5>{" "}
                  </Link>{" "}
                  <h4>89195****</h4>
              </li>
              <li style={{width:"250px", height:"150px", backgroundColor:"#9AFEFF	"}}>
                {" "}
                <Link to="#">
                  {" "}
                  <i className="fa fa-envelope" style={{marginTop:"30px", fontSize:"32px"}}></i>  <h5>Email Id</h5>
                </Link>{" "}
                <h4>beunique@gmail.com</h4>
              </li>
              <li style={{width:"250px", height:"150px", backgroundColor:"#9AFEFF	"}}>
                {" "}
                <Link to="#">
                  {" "}
                  <i className="fa fa-map-marker" style={{marginTop:"30px", fontSize:"32px"}}></i> <h5>Address</h5> {" "}
                </Link>{" "}
                <h4>Vijayawada</h4>
              </li>
              <li style={{width:"250px", height:"150px", backgroundColor:"#9AFEFF	"}}>
                {" "}
                <Link to="#">
                  {" "}
                  <i className="fa fa-calendar" style={{marginTop:"30px", fontSize:"32px"}}></i> <h5>Office Hours</h5> {" "}
                </Link>{" "}
                <h4>8:00 am to 8:00 pm</h4>
              </li>
            </ul>
          </div>
        </div>
        </div>
        </div>
    </div>
  );
}

export default Contact;
