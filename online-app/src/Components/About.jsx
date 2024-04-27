import React from "react";

function About() {
  return (
    <div>
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">About US</h1>
                <span className="color-text-a">
                  <h6>Our Commitment to Quality:</h6> At Be Unique, we are dedicated to delivering top-notch footwear sourced from trusted manufacturers and designers. Every pair of shoes in our collection undergoes rigorous quality checks to ensure superior craftsmanship, comfort, and style. We take pride in offering you only the finest footwear options, guaranteeing that each step you take is supported by excellence.
                  <h6>Convenience Redefined:</h6>
                  Why spend hours browsing crowded malls when you can shop for shoes effortlessly from the comfort of your home? With our intuitive website and mobile app, finding your dream pair is just a few clicks away. Enjoy the convenience of doorstep delivery, allowing you to spend more time strutting your stuff and less time searching for the right fit. 
                  <h6>Wide Variety, Fresh Choices:</h6>
                  Step into a world of endless possibilities with our diverse range of shoes meticulously curated to suit every style and occasion. From sleek sneakers to elegant heels, rugged boots to cozy slippers, our collection caters to all your footwear needs. Whether you're dressing up for a special event, hitting the gym, or simply lounging at home, we've got the perfect pair for you.
                  <h6>Dedicated Customer Support:</h6>
                  Your satisfaction is our top priority. Our friendly and knowledgeable customer support team is here to assist you every step of the way. Whether you need help finding the perfect size, have a question about a specific shoe, or require assistance with your order, we're just a phone call, email, or chat away. Shopping for shoes has never been this easy or enjoyable!
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
                    About
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
