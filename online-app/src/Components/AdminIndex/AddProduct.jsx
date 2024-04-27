import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [product, setProduct] = useState({
    productname: '',
    productimg: null,
    categoryId: '',
    productprice: '',
    description: '',
  });

  const navigate = useNavigate();
  const [myCategory, setMyCategory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:8081/view_Category");
        if (Array.isArray(response.data)) {
          setMyCategory(response.data);
        } else {
          setError("Failed to fetch Category. Invalid response.");
        }
      } catch (error) {
        setError("Failed to fetch Category.");
        console.log(error);
      }
    };

    fetchCategory();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('productname', product.productname);
      formData.append('productimg', product.productimg);
      formData.append('categoryId', product.categoryId);
      formData.append('productprice', product.productprice);
      formData.append('description', product.description);

      await axios.post('http://localhost:8081/addProduct', formData);
      navigate('/adminIndex/view_Product');
      alert('Product Added Successfully');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err.response.data.error);
      } else {
        console.log('Add Product failed');
      }
    }
  };

  const handleImageChange = (event) => {
    setProduct({
      ...product,
      productimg: event.target.files[0],
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  return (
    <div>
      <section className="section">
        <div className="row" style={{ marginLeft: '80px', marginTop: '80px' }}>
          <div className="col-lg-11">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">Add Product</h4>
                <hr />
                <form className="row" onSubmit={handleSubmit}>
                  <div className="card-body" style={{ marginLeft: "12px" }}>
                    <div className="col-12">
                      <label htmlFor="inputName4" className="form-label">Product Name</label>
                      <input
                        type="text"
                        name="productname"
                        value={product.productname}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        id="inputName4"
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputImage" className="form-label">Product Image</label>
                      <input
                        type="file"
                        name="productimg"
                        onChange={handleImageChange}
                        required
                        className="form-control"
                        id="inputImage"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputCategory" className="form-label">Category</label>
                      <select
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        id="inputCategory"
                      >
                        <option value="">Select Category</option>
                        {myCategory.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputPrice" className="form-label">Product Price</label>
                      <input
                        type="text"
                        name="productprice"
                        value={product.productprice}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        id="inputPrice"
                        placeholder="Product Price"
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="col-md-12">
                        <label htmlFor="inputDescription" className="form-label">Description</label>
                        <textarea
                          rows={5}
                          name="description"
                          value={product.description}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                          id="inputDescription"
                          placeholder="Enter Description"
                        />
                      </div>
                    </div>
                    <br />
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
    </div>
  );
}

export default AddProduct;
