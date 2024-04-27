import axios from "axios";
import React, { useEffect, useState } from "react";
import AddToCartButton from './AddToCartButton';

function ProductDashboard() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axios
      .get("http://localhost:8081/view_Product")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div class="page-wrapper">
        <div class="page-content-wrapper">
          <div class="page-content">
            <div class="row" style={{ marginTop: "45px" }}>
              <div className="text-center" style={{ backgroundColor: "pink" }}>
                <hr />
                <h2 style={{ color: "purple" }}>View Product</h2>
                <hr />
              </div>
              {product.map((product, index) => (
                <div class="col-12 col-lg-3">
                  <div class="card radius-10 overflow-hidden">
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
                      <div id="chart1"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDashboard;
