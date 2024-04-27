import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const [product, setProduct] = useState({
    productname: '',
    productimg: null,
    categoryId: '',
    productprice: '',
    description: '',
  });

  const [myCategory, setMyCategory] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('http://localhost:8081/view_Category');
        if (Array.isArray(response.data)) {
          setMyCategory(response.data);
        } else {
          setError('Failed to fetch Category. Invalid response.');
        }
      } catch (error) {
        setError('Failed to fetch Category.');
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getProduct/${id}`)
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('productname', product.productname);
    formData.append('categoryId', product.categoryId);
    formData.append('productprice', product.productprice);
    formData.append('description', product.description);
    formData.append('productimg', product.productimg);

    try {
      await axios.put(`http://localhost:8081/UpdateProduct/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product Updated Successfully');
      navigate('/adminIndex/view_Product');
    } catch (err) {
      console.error(err);
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
                <h4 className="card-title text-center">Edit Product</h4>
                <hr />
                <form className="row" onSubmit={handleSubmit}>
                  <div className="card-body" style={{ marginLeft: '12px' }}>
                    <div className="col-12">
                      <label htmlFor="inputName4" className="form-label">
                        Product Name
                      </label>
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
                        <div className="col-md-12">
                        <div className="col-md-8">
                        <label htmlFor="inputImage" className="form-label">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="productimg"
                            onChange={handleImageChange}
                            className="form-control"
                            id="inputImage"
                        />
                        </div>
                        <div className="col-md-4">
                            <img style={{marginLeft:"720px", width:"100px", marginTop:"-70px"}} src={`http://localhost:8081/images/` + product.productimg} />
                        </div>
                        </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputCategory" className="form-label">
                        Category
                      </label>
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
                      <label htmlFor="inputPrice" className="form-label">
                        Product Price
                      </label>
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
                        <label htmlFor="inputDescription" className="form-label">
                          Description
                        </label>
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
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
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

export default EditProduct;
