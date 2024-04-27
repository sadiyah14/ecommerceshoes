import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SendFeedback() {
  const currentDate = new Date().toISOString().split('T')[0];
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [feedback, setFeedback] = useState({
    feeddescription: "",
    feedname: "",
    feedemail: "",
    feedcontact: "",
    feeddate: currentDate,
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedFeedback = { ...feedback, feeddate: currentDate };

    axios
      .post("http://localhost:8081/addFeedback", feedback, updatedFeedback)
      .then((result) => {
        alert("Feedback Added Successfully");
        navigate("/userIndex");
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8081/userProfile")
      .then((response) => {
        const userProfile = response.data.Result;
        setFeedback({
          feedname: userProfile.username,
          feedemail: userProfile.email,
          feedcontact: userProfile.contact,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  return (
    <div>
      <div className="col-md-11 grid-margin stretch-card" style={{marginLeft:"50px", marginTop:"132px"}}>
        <div className="card">
          <div className="card">
            <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
              <h4
                style={{ marginLeft: "25px", marginTop: "10px", color: "black" }}
                className="card-title"
              >
                <i className="fa fa-telegram"> </i> Send Feedback
              </h4>
            </div>
            <div className="card-body">
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="feeddate"
                        id="exampleInputUsername1"
                        value={currentDate}
                        onChange={handleInputChange}
                        autoComplete="off"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="feedname"
                        id="exampleInputUsername1"
                        autoComplete="off"
                        value={feedback.feedname}
                        onChange={handleInputChange}
                        placeholder="Username"
                        readOnly
                    />
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                    <label htmlFor="exampleInputUsername1">Email Id</label>
                    <input
                        type="email"
                        className="form-control"
                        name="feedemail"
                        value={showPassword ? feedback.feedemail : "********"}
                        onChange={handleInputChange}
                        id="exampleInputUsername1"
                        autoComplete="off"
                        readOnly
                    />
                    <span
                    style={{
                    position: 'absolute',
                    right: '10px',
                    top: '69%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', backgroundColor:"green",
                    padding:"11px", color:"red"
                    }}
                    className={`input-group-text toggle-password-2 ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                    onClick={togglePasswordVisibility}
                ></span>
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                    <label htmlFor="exampleInputUsername1">Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        name="feedcontact"
                        value={showPassword1 ? feedback.feedcontact : "********"}
                        onChange={handleInputChange}
                        id="exampleInputUsername1"
                        autoComplete="off"
                        placeholder="Contact"
                        readOnly
                    />
                    <span
                    style={{
                    position: 'absolute',
                    right: '10px',
                    top: '69%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', backgroundColor:"green",
                    padding:"11px", color:"red"
                    }}
                    className={`input-group-text toggle-password-2 ${showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"}`}
                    onClick={togglePasswordVisibility1}
                ></span>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputConfirmPassword2">Description</label>
                  <textarea rows={5}
                    type="text"
                    className="form-control"
                    name="feeddescription"
                    value={feedback.feeddescription}
                    onChange={handleInputChange}
                    id="exampleInputConfirmPassword2"
                    autoComplete="off"
                    placeholder="Enter Feedback"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mr-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
          </div>
          <br/>
    </div>
  );
}

export default SendFeedback;
