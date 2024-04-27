import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewProduct() {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axios
      .get('http://localhost:8081/view_Product')
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Product ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteProduct/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setProduct(product.filter((product) => product._id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const filteredProduct = product.filter((product) => {
    const { productname, categoryId } = product;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const categoryName = categoryId ? categoryId.categoryname.toLowerCase() : '';
    return (
      productname.toLowerCase().includes(lowerCaseSearchTerm) ||
      categoryName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProduct.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div>
      <div style={{ marginLeft: '95px', marginTop: '20px' }} className="col-lg-10">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center" style={{backgroundColor:"lightsteelblue"}}>View Product</h4>
                  <div style={{display: "flex",justifyContent: "right"}}>
                    <input type="text" style={{width:"220px", height:"32px"}} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
                  </div>
                  <table className="table" style={{ marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Product Name</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Image</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Category</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Price</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Description</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Creation Date</th>
                        <th style={{fontSize:"15px", backgroundColor:"green", color:"black"}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentRows.map((product, index) => (
                        <tr key={product.id}>
                          <td className='text-center'>{product.productname}</td>
                          <td className='text-center'><img style={{width:"100px"}} src={`http://localhost:8081/images/` + product.productimg} /></td>
                          <td className='text-center'>{product.categoryId.categoryname}</td>
                          <td className='text-center'>{product.productprice}</td>
                          <td className='text-center'>{product.description.slice(0,50)} ...</td>
                          <td className='text-center'>{product.date.slice(0,10)}</td>
                          <td className='text-center'>
                            <Link
                              to={`/adminIndex/editProduct/${product._id}`}
                              className="btn btn-primary"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>&nbsp;
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="btn btn-danger"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="10">
                          <div className="pagination">
                            {[...Array(Math.ceil(filteredProduct.length / rowsPerPage)).keys()].map((pageNumber) => (
                              <span
                                key={pageNumber + 1}
                                className={pageNumber + 1 === currentPage ? 'active' : ''}
                                onClick={() => handlePageChange(pageNumber + 1)}
                              >
                                <div className='card-body'>
                                <button className='btn btn-primary'> {pageNumber + 1}</button></div>
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tfoot>
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

export default ViewProduct;
