import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    contact: '',
    email: '',
    city: '',
    birth: '',
    address: '',
    image: null,
  });

  useEffect(() => {
    // Fetch user data based on the provided ID
    axios.get(`http://localhost:8081/get_user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the file along with other data
    const formData = new FormData();
    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('username', user.username);
    formData.append('contact', user.contact);
    formData.append('email', user.email);
    formData.append('city', user.city);
    formData.append('birth', user.birth);
    formData.append('address', user.address);

    if (user.image) {
      formData.append('image', user.image); // Append the image file here, if selected
    }

    // Update the user data using a PUT request
    axios.put(`http://localhost:8081/update_user/${id}`, formData)
      .then((result) => {
        navigate('/adminIndex/reg_user');
        alert('User updated successfully');
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          console.log(err.response.data.error);
        } else {
          console.log('User update failed');
        }
      });
  };

  const handleImageChange = (event) => {
    setUser({ ...user, image: event.target.files[0] });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  return (
    <div>
<section className="section">
      <div className="row" style={{ marginLeft: '80px', marginTop: '80px' }}>
        <div className="col-lg-10">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update User</h5>
<hr/>
              <form className="row" onSubmit={handleSubmit}>
              <div className="card-body" style={{marginLeft:"12px"}}>
                <div className="col-12">
                  <label for="inputNanme4" className="form-label">First Name</label>
                  <input type="text" value={user.firstname}
                  onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                  name="firstname" className="form-control" id="inputNanme4" placeholder='First Name'/>
                </div>
                <div className="col-12">
                  <label for="inputEmail4" className="form-label">Last Name</label>
                  <input type="text" value={user.lastname}
                  onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                  name="lastname" className="form-control" id="inputEmail4" placeholder='Last Name'/>
                </div>
                <div className="col-12">
                  <label for="inputEmail4" className="form-label">Username</label>
                  <input type="text" value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    name="username" className="form-control" id="inputEmail4" placeholder='Username' readOnly/>
                </div>
                <div className="col-12" style={{ position: 'relative' }}>
                  <label for="inputEmail4" className="form-label">Contact</label>
                  <input
                        type="email"
                        className="form-control"
                        name="contact"
                        value={showPassword1 ? user.contact : "********"}
                        onChange={(e) => setUser({ ...user, contact: e.target.value })}
                        id="exampleInputUsername1"
                        autoComplete="off"
                        required
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
                <div className="col-12" style={{ position: 'relative' }}>
                  <label for="inputEmail4" className="form-label">Email Id</label>
                  <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={showPassword ? user.email : "********"}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        id="exampleInputUsername1"
                        autoComplete="off"
                        required
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
                <div className="col-12">
                  <label for="inputEmail4" className="form-label">City</label>
                  <input type="text" value={user.city}
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                  name="city" className="form-control" id="inputEmail4" placeholder='City'/>
                </div>
                <div className="col-12">
                  <label for="inputEmail4" className="form-label">Date of Birth</label>
                  <input type="date" value={user.birth}
                  onChange={(e) => setUser({ ...user, birth: e.target.value })}
                  name="birth" className="form-control" id="inputEmail4" />
                </div>
                <div className="col-12">
                  <label for="inputEmail4" className="form-label">Address</label>
                  <input type="text" value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  name="address" className="form-control" id="inputEmail4" placeholder='Address'/>
                </div>
                <div className="col-md-12">
                  <div className="col-md-8">
                    <label for="inputEmail4" className="form-label">Image</label>
                    <input type="file" onChange={handleImageChange}
                    name="image" className="form-control" id="inputEmail4" placeholder='Image'/>
                  </div>
                  <br/>
                  <div className="col-md-4">
                    <img style={{marginLeft:"650px", width:"100px", marginTop:"-110px"}} src={`http://localhost:8081/images/` + user.image} />
                  </div>
                </div>
                
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
                </div>
              </form>

            </div>
          </div>

        </div>
        </div>
      </section>
      <br/>
      <br/>
      <br/>
  </div>
    );
  }

  export default UpdateUser;
