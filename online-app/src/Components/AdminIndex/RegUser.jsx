import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RegUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [showPassword, setShowPassword] = useState({});
  const [showPassword1, setShowPassword1] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8081/reg_user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this User ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteUser/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setUsers(users.filter((user) => user._id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const filteredUsers = users.filter((users) => {
    const { firstname, lastname, email, contact, city } = users;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      firstname.toLowerCase().includes(lowerCaseSearchTerm) ||
      lastname.toLowerCase().includes(lowerCaseSearchTerm) ||
      email.toLowerCase().includes(lowerCaseSearchTerm) ||
      contact.toLowerCase().includes(lowerCaseSearchTerm)||
      city.toLowerCase().includes(lowerCaseSearchTerm)
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
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div>
      <div
        style={{ marginLeft: "95px", marginTop: "20px" }}
        className="col-lg-10"
      >
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center" style={{backgroundColor:"lightsteelblue"}}>Reg Users</h4>
                  <div style={{ display: "flex", justifyContent: "right" }}>
                    <input
                      type="text"
                      style={{ width: "220px", height: "32px" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                    />
                  </div>
                  <table className="table" style={{ marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            fontSize: "15px",
                            backgroundColor: "green",
                            color: "black",
                          }}
                        >
                          Image
                        </th>
                        <th
                          style={{
                            fontSize: "15px",
                            backgroundColor: "green",
                            color: "black",
                          }}
                        >
                          Full Name
                        </th>
                        <th
                          style={{
                            fontSize: "15px",
                            backgroundColor: "green",
                            color: "black",
                          }}
                        >
                          Last Name
                        </th>
                        <th
                          style={{
                            fontSize: "15px",
                            backgroundColor: "green",
                            color: "black",
                          }}
                        >
                          Contact Number
                        </th>
                        <th
                          style={{
                            fontSize: "15px",
                            backgroundColor: "green",
                            color: "black",
                          }}
                        >
                          City
                        </th>
                        <th
                          style={{
                            fontSize: "15px",
                            backgroundColor: "green",
                            color: "black",
                          }}
                        >
                          Email
                        </th>
                        <th
                          style={{
                            fontSize: "15px",
                            backgroundColor: "green",
                            color: "black",
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((user, index) => (
                        <tr key={user.id}>
                          <td className="text-center">
                            <img
                              style={{ width: "80px" }}
                              src={`http://localhost:8081/images/` + user.image}
                            />
                          </td>
                          <td className="text-center">{user.firstname}</td>
                          <td className="text-center">{user.lastname}</td>
                          <td className="text-center">
                          {showPassword[user._id] ? user.contact : "********"}
                          <span
                            className={`fa ${
                              showPassword[user._id] ? "fa-eye-slash" : "fa-eye"
                            } field-icon toggle-password-2 btn btn-primary`}
                            onClick={() => togglePasswordVisibility(user._id)}
                          ></span>
                          </td>
                          <td className="text-center">{user.city}</td>
                          <td className="text-center">
                          {showPassword1[user._id] ? user.email : "********"}
                          <span
                            className={`fa ${
                              showPassword1[user._id] ? "fa-eye-slash" : "fa-eye"
                            } field-icon toggle-password-2 btn btn-primary`}
                            onClick={() => togglePasswordVisibility1(user._id)}
                          ></span>
                          </td>
                          <td className="text-center">
                            <Link
                              to={`/adminIndex/userEdit/${user._id}`}
                              className="btn btn-primary"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
                            &nbsp;
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="btn btn-danger"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
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
                                Math.ceil(filteredUsers.length / rowsPerPage)
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
    </div>
  );
}

export default RegUser;
