import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewFeedback() {
  const [feed, setFeed] = useState([]);
  const [showPassword, setShowPassword] = useState({});
  const [showPassword1, setShowPassword1] = useState({});
 
  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = () => {
    axios
      .get("http://localhost:8081/manage_feedback")
      .then((response) => {
        setFeed(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Feedback?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteFeed/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setFeed(feed.filter((item) => item._id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
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

  return (
    <div style={{ marginLeft: "95px", marginTop: "80px" }} className="col-lg-10">
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">View Feedback</h4>
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ fontSize: "15px", backgroundColor: "green", color: "black" }}>Username</th>
                      <th style={{ fontSize: "15px", backgroundColor: "green", color: "black" }}>Contact Number</th>
                      <th style={{ fontSize: "15px", backgroundColor: "green", color: "black" }}>Email Id</th>
                      <th style={{ fontSize: "15px", backgroundColor: "green", color: "black" }}>Date</th>
                      <th style={{ fontSize: "15px", backgroundColor: "green", color: "black" }}>Message</th>
                      <th style={{ fontSize: "15px", backgroundColor: "green", color: "black" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feed.map((feedback) => (
                      <tr key={feedback._id}>
                        <td className="text-center">{feedback.feedname}</td>
                        <td className="text-center">
                          {showPassword[feedback._id] ? feedback.feedcontact : "********"}
                          <span
                            className={`fa ${
                              showPassword[feedback._id] ? "fa-eye-slash" : "fa-eye"
                            } field-icon toggle-password-2 btn btn-primary`}
                            onClick={() => togglePasswordVisibility(feedback._id)}
                          ></span>
                        </td>
                        <td className="text-center">
                        {showPassword1[feedback._id] ? feedback.feedemail : "********"}
                          <span
                            className={`fa ${
                              showPassword1[feedback._id] ? "fa-eye-slash" : "fa-eye"
                            } field-icon toggle-password-2 btn btn-primary`}
                            onClick={() => togglePasswordVisibility1(feedback._id)}
                          ></span>
                        </td>
                        <td className="text-center">{feedback.date.slice(0, 10)}</td>
                        <td className="text-center">{feedback.feeddescription}</td>
                        <td className="text-center">
                          <button onClick={() => handleDelete(feedback._id)} className="btn btn-danger">
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
  );
}

export default ViewFeedback;
