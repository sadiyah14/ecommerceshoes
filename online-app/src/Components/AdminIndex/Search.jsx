import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Search() {
  const [bookingId, setBookingId] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [showPassword1, setShowPassword1] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get(
        `http://localhost:8081/searchBooking?bookingId=${bookingId}`
      );
      
      // Set data with the response data
      setData(response.data.Result);
  
      // Check if data is empty and display appropriate message
      if (response.data.Result.length === 0) {
        setData2([{ id: 1 }]); // Add a placeholder object to data2
      } else {
        setData2([]); // Clear data2 if data is found
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const togglePasswordVisibility1 = (id) => {
    setShowPassword1((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Booking?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteBooking/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setBookingId((prevData) =>
              prevData.filter((bookingId) => bookingId._id !== id)
            );
          } else {
            console.error("Error deleting booking");
          }
        })
        .catch((err) => {
          console.error("Error deleting booking:", err);
        });
    }
  };

  return (
    <div>
      <section className="section">
      <div className="row" style={{ marginLeft: '80px', marginTop: '20px' }}>
        <div className="col-lg-11">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-center">Search Booking</h4>
                <hr/>
              <form className="row" onSubmit={handleSubmit}>
              <div className="card-body" style={{marginLeft:"12px"}}>
                <div className="col-12">
                  <label for="inputNanme4" className="form-label">Search by Booking Id</label>
                  <input type="text" name="categoryname" value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      required
                      autoComplete="off"
                      className="form-control" id="inputNanme4" placeholder='Enter Booking Number'/>
                </div>
                <br/>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                </div>
              </form>
              </div>
              {data.length > 0 && (
          <div className="card">
            <h4
              style={{ marginLeft: "25px", marginTop: "10px" }}
              className="card-title text-center"
            >
              Result against "{bookingId}" Keyword
            </h4>
            <div className="table-responsive">
            <table className="table datatable" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Sr. No
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Booking Id
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Booking Date
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Customer Name
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Email Id
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Total Price
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Product Details
                  </th>
                  <th
                    style={{
                      fontSize: "15px",
                      backgroundColor: "green",
                      color: "black",
                    }}
                  >
                    Cancel Booking
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((booking, index) => (
                  <tr key={booking._id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{booking.bookingId}</td>
                    <td className="text-center">
                      {booking.date.slice(0, 10)}
                    </td>
                    <td className="text-center">{booking.userId.username}</td>
                    <td className="text-center">
                    {showPassword1[booking._id] ? booking.userId.email : "********"}
                          <span
                            className={`fa ${
                              showPassword1[booking._id] ? "fa-eye-slash" : "fa-eye"
                            } field-icon toggle-password-2 btn btn-primary`}
                            onClick={() => togglePasswordVisibility1(booking._id)}
                          ></span>
                    </td>
                    <td className="text-center">
                      <Link
                        className="btn btn-warning"
                        to={`/adminIndex/changeStatus/${booking._id}`}
                      >
                        {booking.status}
                      </Link>
                    </td>
                    <td className="text-center">
                      {booking.products.reduce(
                        (total, product) => total + product.quantity,
                        0
                      )}
                    </td>
                    <td className="text-center">
                      {booking.products.reduce(
                        (total, product) =>
                          total +
                          product.productId.productprice * product.quantity,
                        0
                      )}
                    </td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        to={`/adminIndex/adminBookingDetail/${booking._id}`}
                      >
                        Detail
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="btn btn-warning"
                        onClick={() => handleDelete(booking._id)}
                      >
                        Cancel
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
        {data2.length > 0 && (
          <div className="container-fluid">
            <div className="text-center">
              <h2>No data found for Booking {bookingId}</h2>
            </div>
          </div>
        )}
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Search
