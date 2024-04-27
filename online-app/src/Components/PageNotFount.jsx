import React from "react";
const style=`
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.error-card {
  height: 500px;
  margin-top: 10px;
  border-color: #f6c23e;
}

.error-content {
  background-color: #f0f2f5;
  padding: 40px;
}

.error-title {
  margin-top: 0;
  font-size: 36px;
  color: #ff5722;
}

.error-description {
  font-size: 18px;
  color: #333;
}

`;

function PageNotFount() {
  return (
    <div>
      <style>
        {`
          /* Your styles here */
          ${style}
        `}
      </style>
    <div className="error-page">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card error-card">
          <div className="card-body text-center error-content">
            <h1 className="error-title" style={{marginTop:"150px"}}>Oops! Page Not Found</h1>
            <p className="error-description">
              The page you are looking for might have been removed or is temporarily unavailable.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PageNotFount;
