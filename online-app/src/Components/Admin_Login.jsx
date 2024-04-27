import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin_Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8081/login', { username, password })
    .then(result => { 
      console.log(result);
      if (result.data.message === "Login successful") {
        navigate('/adminIndex');
        alert("Login Successful");
      } else {
        alert("Invalid email or password");
      }
    })
    .catch(err => {
      console.log(err);
      alert("Invalid username or password");
    });
    };

  return (
    <div>
      <section className="property-single nav-arrow-b" style={{ marginTop: "112px" }}>
        <br />
        <div className="container border" style={{ backgroundColor: "#B5EAAA" }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="col-md-12">
                <div className="row section-t3">
                  <div className="col-sm-12">
                    <div className="title-box-d">
                      <h3 className="title-d">Admin Login </h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="property-contact">
                      <form className="form-a" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-12 mb-2">
                            <div className="form-group">
                              <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                                autoComplete="off"
                                className="form-control form-control-lg form-control-a"
                                id="inputName"
                                placeholder="Username *"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-12 mb-1">
                            <div className="form-group">
                              <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                autoComplete="off"
                                className="form-control form-control-lg form-control-a"
                                id="inputEmail1"
                                placeholder="Password *"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-12 mt-3 mb-2 text-center">
                            <button type="submit" className="btn btn-a" style={{marginLeft:"12px",color:'#A05544',background:'white'}}>
                              Login
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </section>
    </div>
  );
}

export default Admin_Login;
