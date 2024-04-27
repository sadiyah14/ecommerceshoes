import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const changePassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Make a POST request to your changePassword endpoint
    axios
  .put(
    "http://localhost:8081/changePassword",
    {
      currentPassword: currentPassword,
      newPassword: newPassword,
    },
    { withCredentials: true }
  )
  .then((response) => {
    if (response.status === 200 && response.data.message === "Password changed successfully") {
      alert("Password changed successfully!");
      navigate("/");
    } else {
      alert("An error occurred during password change.");
    }
  })
  .catch((error) => {
    if (error.response && error.response.data) {
      alert(`Error: ${error.response.data.error}`);
    } else {
      console.error("Error:", error.message);
    }
  });
  };

  return (
    <div>
      <div className="col-md-11 grid-margin stretch-card" style={{marginLeft:"50px", marginTop:"32px"}}>
        <div className="card">
          <div className="card">
            <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
              <h4
                style={{ marginLeft: "25px", marginTop: "10px", color: "black" }}
                className="card-title"
              >
                <i className="fa fa-key"> </i> Change Password
              </h4>
            </div>
            <div className="card-body">
              <form className="forms-sample">
                <div className="form-group">
                  <label htmlFor="exampleInputUsername1">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="name"
                    id="exampleInputUsername1"
                    value={currentPassword}
                    onChange={(event) => {
                      setCurrentPassword(event.target.value);
                    }}
                    autoComplete="off"
                    placeholder="Current Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputConfirmPassword1">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="description"
                    id="exampleInputConfirmPassword1"
                    value={newPassword}
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                    autoComplete="off"
                    placeholder="New Password"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputConfirmPassword2">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="price"
                    id="exampleInputConfirmPassword2"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    autoComplete="off"
                    placeholder="Confirm Password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  onClick={changePassword}
                  className="btn btn-primary mr-2"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
