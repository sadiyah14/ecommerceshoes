import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminViewBooking() {
  const [bookingData, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [showPassword, setShowPassword] = useState({});
  const [showPassword1, setShowPassword1] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8081/adminViewBooking", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.Status === "Success") {
          setBookingData(response.data.bookingData);
        } else {
          console.error("Failed to fetch booking data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Booking?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteBooking/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setBookingData((prevData) =>
              prevData.filter((booking) => booking._id !== id)
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

  const filteredBookings = bookingData.filter((booking) => {
    const { bookingId, userId, email, status } = booking;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      bookingId.toLowerCase().includes(lowerCaseSearchTerm) ||
      userId.toLowerCase().includes(lowerCaseSearchTerm) ||
      email.toLowerCase().includes(lowerCaseSearchTerm) ||
      status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const togglePasswordVisibility = (id) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const togglePasswordVisibility1 = (id) => {
    setShowPassword1((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBookings.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div
      style={{ marginLeft: "95px", marginTop: "15px" }}
      className="col-lg-10"
    >
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4
                  className="card-title text-center"
                  style={{ backgroundColor: "lightsteelblue" }}
                >
                  View Booking
                </h4>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <input
                    type="text"
                    style={{ width: "220px", height: "32px" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                  />
                </div>
                <table
                  className="table datatable"
                  style={{ marginTop: "10px" }}
                >
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
                    {currentRows.map((booking, index) => (
                      <tr key={booking._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{booking.bookingId}</td>
                        <td className="text-center">
                          {booking.date.slice(0, 10)}
                        </td>
                        <td className="text-center">{booking.userId}</td>
                        <td className="text-center">
                        {showPassword1[booking._id] ? booking.email : "********"}
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
                  <tfoot>
                    <tr>
                      <td colSpan="10">
                        <div className="pagination">
                          {[
                            ...Array(
                              Math.ceil(filteredBookings.length / rowsPerPage)
                            ).keys(),
                          ].map((pageNumber) => (
                            <span
                              key={pageNumber + 1}
                              className={
                                pageNumber + 1 === currentPage ? "active" : ""
                              }
                              onClick={() => handlePageChange(pageNumber + 1)}
                            >
                              <div className="card-body">
                                <button className="btn btn-primary">
                                  {" "}
                                  {pageNumber + 1}
                                </button>
                              </div>
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
  );
}

export default AdminViewBooking;
