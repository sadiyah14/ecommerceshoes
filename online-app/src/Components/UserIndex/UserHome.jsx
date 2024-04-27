import axios from "axios";
import React, { useEffect, useState } from "react";
import AddToCartButton from './AddToCartButton';
import { Link } from "react-router-dom";
import '../UserIndex/UserHome.css';

function UserHome() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductAndCategories();
  }, []);

  const fetchProductAndCategories = () => {
    axios
      .get("http://localhost:8081/view_Category")
      .then((response) => {
        console.log("Categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    axios
      .get("http://localhost:8081/view_Product")
      .then((response) => {
        console.log("Products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const [product, setProduct] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get(
        `http://localhost:8081/searchProduct?product=${product}`
      );
      
      // Check if the response data is an array
      if(Array.isArray(response.data.Result)) {
        setData(response.data.Result);
        // Check if data is empty and display appropriate message
        if (response.data.Result.length === 0) {
          setData2([{ id: 1 }]); // Add a placeholder object to data2
        } else {
          setData2([]);
        }
      } else {
        // If response.data.Result is not an array, handle it accordingly
        setData([]); // Set data to an empty array
        setData2([{ id: 1 }]); // Add a placeholder object to data2 or handle it as per your requirement
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <div className="intro intro-carousel swiper position-relative">

<div className="swiper-wrapper">

  <div className="swiper-slide carousel-item-a intro-item bg-image" style={{backgroundImage: 'url(assets/img/slide-1.jpg)'}}>
    <div className="overlay overlay-a"></div>
    <div className="intro-content display-table">
      <div className="table-cell">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="intro-body">
                <h1 style={{color:"white", marginLeft:'-255px', fontSize:'55px', fontWeight:'5000%'}}>
                Be Unique,<br/><span className="color-b"> With Unique Shoes</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<main id="main">
<section className="section-services section-t8" style={{ marginTop: "-82px" }}>
<div className="container">
<div className="row">
  <div className="col-md-12">
    <div className="title-wrap d-flex justify-content-center">
      <div className="title-box">
        <form onSubmit={handleSubmit}>
          <input placeholder=" Search" value={product}
                  required
                        onChange={(e) => setProduct(e.target.value)}
                        style={{ width: "250px", height: "40px" }} /><button type="submit" style={{ width: "40px", height: "40px" }}><i className="fa fa-search"></i></button>
        </form>
      </div>
    </div>
  </div>
  {data.length > 0 && (
  <div class="page-wrapper" style={{ marginTop: "-82px" }}>
        <div class="page-content">
          <div class="row">
              <hr />
              <h5 style={{ color: "purple" }}>Search for "{product}"</h5>
              <hr />
            {data.map((productItem, index) => (
                    <div className="col-12 col-lg-3" key={productItem._id}>
                      <div className="card radius-10 overflow-hidden">
                        <div className="card-body">
                          <div className="d-flex">
                            <div className="text-center" style={{ alignItems: "center" }}>
                              <img
                                style={{ width: "180px", height: "150px" }}
                                src={`http://localhost:8081/images/${productItem.productimg}`}
                                alt={productItem.productname}
                              />
                              <h5>{productItem.productname}</h5>
                              <h5> Rs. {productItem.productprice}</h5>
                              <span>{productItem.description}</span>
                              <div className="d-grid">
                                <AddToCartButton productId={productItem._id} />
                              </div>
                            </div>
                          </div>
                          <div id="chart1"></div>
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </div>
      )}
      {data2.length > 0 && (
        <div className="container card">
          <div className="text-center">
            <h4>No data found for Product {product}</h4>
          </div>
        </div>
      )}
</div>
</div>
</section>
<section className="section-services section-t8" style={{ marginTop: "-152px" }}>
<div className="container">
<div className="row">
  <div className="col-md-12">
    <div className="title-wrap d-flex justify-content-between">
      <div className="title-box">
        <h2 className="title-a"><i className="fa fa-desktop"></i> Popular Products</h2>
      </div>
    </div>
  </div>
</div>
<div class="page-wrapper" style={{ marginTop: "-45px" }}>
      {categories.map((category) => (
          <div class="page-content">
            <div class="row">
              <div key={category._id} style={{ marginTop: "-52px" }}>
                <hr />
                <h2 style={{ color: "purple" }}><i className="fa fa-adjust"></i> {category.categoryname}</h2>
                <hr />
              </div>
              {products
            .filter((product) => product.categoryId._id === category._id)
            .map((product) => (
                <div class="col-12 col-lg-3">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex">
                        <div
                          className="text-center"
                          style={{ alignItems: "center" }}
                        >
                          <img
                            style={{ width: "180px", height: "150px" }}
                            src={
                              `http://localhost:8081/images/` +
                              product.productimg
                            }
                          />
                          <h5>{product.productname}</h5>
                          <h5> Rs. {product.productprice}</h5>
                          <span>{product.description}</span>
                          <div className="d-grid">
                            <AddToCartButton productId={product._id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      ))}
      </div>
      </div>
</section>
</main>
    </div>
  )
}

export default UserHome