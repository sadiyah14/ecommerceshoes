import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewBooking() {
  const [bookingData, setBookingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:8081/viewBooking', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Status === 'Success') {
          setBookingData(data.bookingData);
        } else {
          console.error('Failed to fetch booking data');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Booking?");
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteBooking/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setBookingData(prevData => prevData.filter(booking => booking._id !== id));
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
    const { bookingId, status } = booking;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      bookingId.toLowerCase().includes(lowerCaseSearchTerm) ||
      status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredBookings.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div>
      <div style={{ marginLeft: '95px', marginTop: '140px' }} className="col-lg-10">
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center">View Booking</h4>
                  <div style={{display: "flex",justifyContent: "right"}}>
                    <input type="text" style={{width:"220px", height:"32px"}} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
                  </div>
                  <table className="table" style={{ marginTop: '10px' }}>
                    <thead>
                      <tr>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Sr. No</th>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Booking Id</th>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Booking Date</th>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Status</th>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Quantity</th>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Total Price</th>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Product Details</th>
                        <th style={{ fontSize: '15px', backgroundColor: '#B1907F	', color: 'black' }}>Cancel Booking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((booking, index) => (
                        console.log('Booking Object:', booking),
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{booking.bookingId}</td>
                          <td className="text-center">{booking.date.slice(0,10)}</td>
                          <td className="text-center">{booking.status}</td>
                          <td className="text-center">
                            {booking.products.reduce((total, product) => total + product.quantity, 0)}
                          </td>
                          <td className="text-center">
                            {booking.products.reduce((total, product) => total + product.productId.productprice * product.quantity, 0)}
                          </td>
                          <td><Link className='btn btn-warning' to={`/userIndex/bookingDetail/${booking._id}`}>Detail</Link></td>
                          <td>
                            {booking.status === 'Pending' ? (
                              <Link className='btn btn-warning' onClick={() => handleDelete(booking._id)} to="">
                                Cancel
                              </Link>
                            ) : (
                              <button className='btn btn-warning' disabled>
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="10">
                          <div className="pagination">
                            {[...Array(Math.ceil(filteredBookings.length / rowsPerPage)).keys()].map((pageNumber) => (
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

export default ViewBooking;
