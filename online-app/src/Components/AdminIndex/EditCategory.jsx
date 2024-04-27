import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    categoryname: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getCategory/${id}`)
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/updateCategory/${id}`, category) // Use PUT method to update the category
      .then((result) => {
        alert('Category Updated Successfully');
        navigate('/adminIndex/view_Category');
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className="section">
        <div className="row" style={{ marginLeft: '80px', marginTop: '80px' }}>
          <div className="col-lg-11">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">Update Category</h4>
                <hr />
                <form className="row" onSubmit={handleSubmit}>
                  <div className="card-body" style={{ marginLeft: '12px' }}>
                    <div className="col-12">
                      <label htmlFor="inputName4" className="form-label">Category Name</label>
                      <input
                        type="text"
                        name="categoryname"
                        value={category.categoryname}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        id="inputName4"
                        placeholder="Category Name"
                      />
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
    </div>
  );
}

export default EditCategory;
