import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const [category, setCategory] = useState({
        categoryname: '',
      });
      const navigate = useNavigate();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/addCategory', category)
          .then(result => {
            alert("Category Added Successfull")
            navigate('/adminIndex/view_Category');
          })
          .catch(err => console.log(err));
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory(prevCategory => ({
          ...prevCategory,
          [name]: value
        }));
      };
    
  return (
    <div>
      <section className="section">
      <div className="row" style={{ marginLeft: '80px', marginTop: '80px' }}>
        <div className="col-lg-11">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">Add Category</h4>
                <hr/>
              <form className="row" onSubmit={handleSubmit}>
              <div className="card-body" style={{marginLeft:"12px"}}>
                <div className="col-12">
                  <label for="inputNanme4" className="form-label">Category Name</label>
                  <input type="text" name="categoryname" value={category.name}
                      onChange={handleInputChange}
                      required
                      className="form-control" id="inputNanme4" placeholder='Category Name'/>
                </div>
                <br/>
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
  )
}

export default AddCategory
