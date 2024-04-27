import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

const FruitsProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategoryName] = useState('');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentRecommendedIndex, setCurrentRecommendedIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/products_by_category/${id}`)
      .then((response) => {
        const products = response.data.products || [];
        setProduct(products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    axios
      .get(`http://localhost:8081/getCategory/${id}`)
      .then((response) => {
        setCategoryName(response.data.category || '');
      })
      .catch((error) => {
        console.error(error);
      });
    
      const productInterval = setInterval(() => {
        setCurrentProductIndex((prevIndex) => (prevIndex + 1) % product.length);
      }, 3000);
  
      return () => {
        clearInterval(productInterval);
      };
  }, [id, product.length]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div className="row" style={{ marginTop: "45px" }}>
              <div className='text-center' style={{ backgroundColor: "yellow" }}>
                <hr />
                <h2 style={{ color: "purple" }}>{category.categoryname}</h2>
                <hr />
              </div>
              {product.map((item) => (
                <div className="col-12 col-lg-3" key={item._id}>
                  <div className="card radius-10 overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className='text-center' style={{ alignItems: "center" }}>
                          <img
                            style={{ width: "180px", height: "150px" }}
                            src={`http://localhost:8081/images/` + item.productimg}
                            alt={item.productname}
                          />
                          <h5>{item.productname}</h5>
                          <h5> Rs. {item.productprice}</h5>
                          <span>{item.description}</span>
                          <div className="d-grid">
                            <AddToCartButton productId={item._id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='text-center' style={{ backgroundColor: "yellow" }}>
                <hr />
                <h3 style={{ color: "purple" }}>Product Recommendation</h3>
                <hr />
              </div>
              {product.length > 0 &&
                product.map((item, index) => (
                <div className="col-12 col-lg-3" key={item._id} style={{
                  display: index >= currentProductIndex && index < currentProductIndex + 100 ? 'block' : 'none',
                }}>
                  <div className="card radius-10 overflow-hidden">
                    <div className="card-body">
                      <div className="d-flex">
                        <div className='text-center' style={{ alignItems: "center" }}>
                          <img
                            style={{ width: "180px", height: "150px" }}
                            src={`http://localhost:8081/images/` + item.productimg}
                            alt={item.productname}
                          />
                          <h5>{item.productname}</h5>
                          <h5> Rs. {item.productprice}</h5>
                          <span>{item.description}</span>
                          <div className="d-grid">
                            <AddToCartButton productId={item._id} />
                          </div>
                        </div>
                      </div>
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
};

export default FruitsProduct;
