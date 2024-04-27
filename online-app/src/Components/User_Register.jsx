import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function User_Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
   
    formData.append('username', username);
    
    formData.append('email', email);
    formData.append('password', password);
    
    formData.append('address', address);
    

    axios.post('http://localhost:8081/register', formData)
      .then((result) => {
        navigate('/User_login');
        alert('Email registered successfully');
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert('Email already registered');
          console.log(err.response.data.error);
        } else {
          console.log('Registration failed');
        }
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  
  return (
    <div>
       <section className="property-single nav-arrow-b" style={{ marginTop: "112px" }}>
      <br/>
      <div className="container border" style={{backgroundColor:"#B5EAAA"}}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
          <div className="col-md-12">
            <div className="row section-t3">
              <div className="col-sm-12">
                <div className="title-box-d">
                  <h3 className="title-d">Sign Up</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="property-contact">
                  <form className="form-a" onSubmit={handleSubmit} encType="multipart/form-data">
                    
                      
                      
                    
                    
                      <div className="col-md-6 mb-2">
                        <div className="form-group">
                          <input type="text" onChange={e => setUsername(e.target.value)} name='username' className="form-control form-control-lg form-control-a" id="inputName" placeholder="Username *" required />
                        </div>
                      
                      
                    </div>
                    
                      <div className="col-md-6 mb-2">
                        <div className="form-group">
                          <input type="email" onChange={e => setEmail(e.target.value)} name='email' className="form-control form-control-lg form-control-a" id="inputName" placeholder="Email *" required />
                        </div>
                      </div>
                      <div className="col-md-6 mb-1">
                        <div className="form-group">
                          <input type="password" onChange={e => setPassword(e.target.value)} name='password' className="form-control form-control-lg form-control-a" id="inputEmail1" placeholder="Password *" required />
                        </div>
                      </div>
                  
                    
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <div className="form-group">
                          <input type="text" onChange={e => setAddress(e.target.value)} name='address' className="form-control form-control-lg form-control-a" id="inputName" placeholder="Enter Address *" required />
                        </div>
                      </div>
                      
                    </div>
                    
                      <div className="col-md-12 mt-3 mb-2 text-center">
                        <button type="submit" className="btn btn-a"style={{marginLeft:"12px",color:'#A05544',background:'white'}} >Sign Up</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      </section>
    </div>
  )
}

export default User_Register;
