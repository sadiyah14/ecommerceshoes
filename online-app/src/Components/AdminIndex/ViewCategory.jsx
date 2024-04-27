import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);
  
  const fetchCategory = () => {
    axios
      .get('http://localhost:8081/view_Category')
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Category ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteCategory/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setCategory(category.filter((category) => category._id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div style={{ marginLeft: '95px', marginTop: '20px' }} className="col-lg-10">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center" style={{backgroundColor:"lightsteelblue"}}>View Category</h4>
                  <br/>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Category Name</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Creation Date</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.map((category, index) => (
                        <tr key={category.id}>
                          <td className='text-center'>{category.categoryname}</td>
                          <td className='text-center'>{category.date}</td>
                          <td className='text-center'>
                            <Link
                              to={`/adminIndex/editCategory/${category._id}`}
                              className="btn btn-primary"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
                            &nbsp;
                            <button
                              onClick={() => handleDelete(category._id)}
                              className="btn btn-danger"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewCategory;
