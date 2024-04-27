import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddBookingButton from './AddBookingButton';

const style = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

/* Payment Method Section */
.payment_method {
	width: 55rem;
	height: 35rem;
	background-color: #fff;
	position: absolute;
	bottom: 30px;
    top: 130px;
	left: 30px;
	border-radius: 10px;
}

.card_info {
	width: 40rem;
	height: 25rem;
	background: #bcf7da;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
		rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	border-radius: 10px;
	margin: 0 0 0 40px;
	position: relative;
}

.card_head {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 20px 0 0 20px;
}

.card_head .card_title {
	font-size: 20px;
	font-weight: bold;
}

.card_head .btn1 {
	width: 20px;
	height: 20px;
}

.card_types {
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 10px 0 0 60px;
}

.card_types .card_img {
	width: 50px;
	height: 50px;
}

.card_info form {
	display: flex;
	flex-direction: column;
	width: fit-content;
	padding: 10px 0 0 60px;
}

.card_info form input {
	padding: 15px 30px 15px 16px;
	margin-top: 20px;
	font-size: 15px;
	text-transform: capitalize;
	outline: none;
	border: none;
	border-radius: 50px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}

.card_info form div {
	display: flex;
	gap: 70px;
}

.save_card {
	font-weight: bold;
	font-size: 15px;
	position: absolute;
	bottom: 30px;
	left: 30px;
	text-transform: uppercase;
	color: #068e14;
	font-weight: bold;
	transition: all 0.3s;
}

.save_card:hover {
	color: #07cb1a;
	cursor: pointer;
}

.e_payment {
	position: absolute;
	top: 70px;
	right: 50px;
}

.e_payment img {
	width: 100px;
	height: 100px;
	padding: 20px;
	margin-bottom: 15px;
	background-color: #fff;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
	border-radius: 50%;
	transition: all 0.2s;
}

.e_payment img:hover {
	cursor: pointer;
	transform: rotateZ(360deg);
}

.confirm_btn {
	background: #ff6868;
	padding: 10px 40px;
	font-size: 17px;
	font-weight: bold;
	color: #fff;
	position: absolute;
	right: 50px;
	bottom: 10px;
	border-radius: 50px;
	border: none;
	filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
	transition: all 0.3s;
}

.confirm_btn:hover {
	background: #fd2d2d;
	cursor: pointer;
	scale: 1.1;
}

/* Order Summary Section */
.order_summary {
	width: 20rem;
	height: 35rem;
	position: absolute;
	top: 30px;
	right: 25px;
}

.order_head {
	padding: 20px 0 20px 80px;
	font-weight: 900;
	font-size: 1.2rem;
}

hr {
	border: none;
	border-top: 0.5px solid black;
}

.order_price {
	display: grid;
	grid-template-columns: repeat(1, 4fr);
	margin-top: 20px;
}
.price,
.total_price {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
}

.dark {
	font-weight: bold;
}

.qr_code {
	width: 10rem;
	height: 10rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;
	margin-top: 70px;
}

.condition {
	margin-top: 40px;
	width: 100%;
	font-size: 15px;
}

.review_btn {
	background: #ff6868;
	padding: 10px 60px;
	margin: 30px 0 0 25px;
	font-size: 17px;
	font-weight: bold;
	color: #fff;
	border-radius: 50px;
	border: none;
	filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
	transition: all 0.3s;
}

.review_btn:hover {
	background: #fd2d2d;
	cursor: pointer;
	scale: 1.1;
}

.project_by {
	position: absolute;
	bottom: 50px;
	right: 85px;
	font-size: 13px;
	text-align: center;
}
.project_by span {
	font-size: 20px;
	text-transform: uppercase;
}

`;

function Payment() {
	const navigate = useNavigate();
	const currentDate = new Date().toISOString().split('T')[0];
    const [cartData, setCartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [bookingId, setBookingId] = useState('');
    
    useEffect(() => {
        axios
        .get(`http://localhost:8081/cartCheckout/${id}`)
        .then((response) => {
          setCartData(response.data.cart);
          setBookingId(response.data.bookingId); // Set the Booking Id received from the server
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) {
      return <div>Loading...</div>; // Loading indicator
    }
  
    if (error) {
      return <div>Error occurred: {error.message}</div>; // Error message
    }
  
    const totalPrice = cartData.products.reduce((total, product) => {
      return total + product.productId.productprice * product.quantity;
    }, 0);
	const handleSubmit = async () => {
		navigate("/UserIndex")
	  };
	
  return (
    <div>
      <style>{style}</style>
      <main className="">
        <div className="">
          <section
            className="payment_method border"
            style={{ marginLeft: "150px" }}
          >
            <h2 className="ship_head text-center">Payment Method</h2>
            <hr />
            <div className="card_info">
              <form action="" onSubmit={handleSubmit}>
                <div className="card_head">
                  <h2 className="card_title">Debit or Credit Card</h2>
                  <h3 className="card_title text-red">Total Amount: {totalPrice}</h3>
                </div>
                <div className="card_types">
                  <img
                    className="card_img"
                    src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                    alt=""
                  />
                  <img
                    className="card_img"
                    src="https://cdn-icons-png.flaticon.com/512/349/349230.png"
                    alt=""
                  />
                  <img
                    className="card_img"
                    src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                    alt=""
                  />
                  <img
                    className="card_img"
                    src="https://img.icons8.com/fluency/512/mastercard.png"
                    alt=""
                  />
                </div>
                <input
                  type="text"
                  name="holder_name"
                  placeholder="Card Holder"
                  maxlength={60}
				  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Card Number"
                  maxlength={16}
				  required
                />
                <div>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="Expire"
                    maxlength={5}
					required
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    maxlength={3}
					required
                  />
                </div>
				<button type='submit' style={{marginLeft:"220px"}}>
					<span style={{marginTop:"20px"}}>
						<AddBookingButton cartId={cartData._id} />
					</span>
				</button>
			  </form>
            </div>
            <div className="e_payment">
              <div className="pay">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png"
                  alt=""
                />
              </div>
              <div className="pay">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5977/5977576.png"
                  alt=""
                />
              </div>
              <div className="pay">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/196/196565.png"
                  alt=""
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Payment;
