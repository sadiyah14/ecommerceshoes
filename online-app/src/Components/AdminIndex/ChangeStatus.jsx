import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function ChangeStatus() {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState(""); // State to hold the new status
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/adminbookingDetail/${id}`)
      .then((response) => {
        setBookingData(response.data.bookingDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8081/updateBooking/${id}`, { status: newStatus })
      .then((res) => {
        if (res.data.status === "Success") {
          alert("Status updated successfully");
          navigate("/adminIndex/adminViewBooking");
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="grid-margin stretch-card"
        style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}
      >
        <div className="card" style={{ width: "50%" }}>
          <div style={{ backgroundColor: "#57c7d4" }}>
            <h4 style={{ color: "black" }} className="card-title text-center">
              <i className="fa fa-star"> </i> Change Status
            </h4>
          </div>
          <div className="card-body">
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputUsername1">Booking Id</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="exampleInputUsername1"
                  value={bookingData.bookingId}
                  autoComplete="off"
                  placeholder="Current Password"
                  readOnly
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputConfirmPassword2">Status</label>
                <select
                  className="form-control"
                  name="status"
                  id="exampleInputConfirmPassword2"
                  autoComplete="off"
                  onChange={(e) => setNewStatus(e.target.value)}
                  value={newStatus}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Accept">Accept</option>
                  <option value="In delivery">In delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeStatus;
