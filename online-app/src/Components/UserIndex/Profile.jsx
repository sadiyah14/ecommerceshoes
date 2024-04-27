import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [data, setData] = useState({
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
    axios
      .get('http://localhost:8081/profile')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          alert('Error: ' + res.data.Error);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error fetching profile data');
      });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('username', data.username);
    formData.append('contact', data.contact);
    formData.append('email', data.email);
    formData.append('city', data.city);
    formData.append('birth', data.birth);
    formData.append('address', data.address);

    try {
      const response = await axios.put('http://localhost:8081/updateProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.Status === 'Success') {
        console.log('Profile updated successfully');
        alert('Profile updated successfully');
        navigate('/userIndex');
      } else {
        console.error('Error updating profile');
        alert('Error updating profile: ' + response.data.Error);
      }
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Error updating profile: ' + error.message);
    }
  };


  return (
    <div>
      <div className="col-md-11 grid-margin stretch-card" style={{ marginLeft: "50px", marginTop: "132px" }}>
        <div className="card">
          <div style={{ backgroundColor: "#57c7d4", height: "40px" }}>
            <h4
              style={{ marginLeft: "25px", marginTop: "10px", color: "black" }}
              className="card-title text-center"
            >
              <i className="fa fa-user"></i>  View Profile
            </h4>
          </div>
          <div className="card-body">
              <form className="forms-sample" onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="row mb-2" style={{marginLeft:"5px"}}>
                <div className="col-md-6">
                  <label htmlFor="exampleInputUsername1">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={data.firstname}
                    onChange={(e) => setData({ ...data, firstname: e.target.value })}
                    id="exampleInputUsername1"
                    autoComplete="off"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="exampleInputUsername1">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={data.lastname}
                    onChange={(e) => setData({ ...data, lastname: e.target.value })}
                    id="exampleInputUsername1"
                    autoComplete="off"
                    placeholder="Last Name"
                    required
                  />
                </div>
                </div>
                <div className="form-group mb-2" style={{marginLeft:"17px"}}>
                  <label htmlFor="exampleInputConfirmtext2">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={data.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    id="exampleInputConfirmtext2"
                    placeholder="User Name"
                    readOnly
                  />
                </div>
                <div className="row mb-2" style={{marginLeft:"5px"}}>
                  <div className="col-md-6">
                  <label htmlFor="exampleInputUsername1">Image</label>
                  <input
                    type="file"
                    onChange={(e) =>
                        setData({ ...data, image: e.target.files[0] })
                      }
                    className="form-control"
                    name="image"
                    id="exampleInputUsername1"
                  />
                </div>
                <div className="col-md-6">
                  <img src={`http://localhost:8081/images/` + data.image} style={{width:"120px"}} />
                </div>
                </div>
              <div className="row mb-2" style={{marginLeft:"5px"}}>
                <div className="col-md-6" style={{ position: 'relative' }}>
                <label htmlFor="exampleInputUsername1">Email</label>
                <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={showPassword ? data.email : "********"}
                    onChange={(e) => {
                    if (showPassword) {
                        setData(prevData => ({ ...prevData, email: e.target.value }));
                    }
                    }}
                    id="exampleInputUsername1"
                    autoComplete="off"
                    placeholder="Email Id"
                    required
                />
                <span
                    style={{
                    position: 'absolute',
                    right: '10px',
                    top: '69%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    padding:"11px", color:"blue"
                    }}
                    className={`input-group-text toggle-password-2 ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                    onClick={togglePasswordVisibility}
                ></span>
                </div>

                <div className="col-md-6" style={{ position: 'relative' }}>
                  <label htmlFor="exampleInputUsername1">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact"
                    value={showPassword1 ? data.contact : "********"}
                    onChange={(e) => {
                    if (showPassword1) {
                        setData(prevData => ({ ...prevData, contact: e.target.value }));
                    }
                    }}
                    id="exampleInputUsername1"
                    autoComplete="off"
                    placeholder="Contact Number"
                    required
                  />
                  <span
                    style={{
                    position: 'absolute',
                    right: '10px',
                    top: '69%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    padding:"11px", color:"blue"
                    }}
                    className={`input-group-text toggle-password-2 ${showPassword1 ? "fa fa-eye-slash" : "fa fa-eye"}`}
                    onClick={togglePasswordVisibility1}
                ></span>
                </div>
                </div>
                <div className="form-group mb-2" style={{marginLeft:"17px"}}>
                  <label htmlFor="exampleInputConfirmtext2">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="birth"
                    value={data.birth}
                    onChange={(e) => setData({ ...data, birth: e.target.value })}
                    id="exampleInputConfirmtext2"
                    required
                  />
                </div>
                <div className="form-group mb-2" style={{marginLeft:"17px"}}>
                  <label htmlFor="exampleInputConfirmtext2">Address</label>
                  <textarea
                    type="text"
                    rows={4}
                    className="form-control"
                    name="address"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    id="exampleInputConfirmtext2"
                    required
                  />
                </div>
                <div className=' text-center'>
                <button
                  type="submit"
                  className="btn btn-primary mr-2"
                >
                  Update Profile
                </button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
