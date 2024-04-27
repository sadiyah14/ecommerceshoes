import { Routes, Route } from 'react-router-dom';
import Index from './Components/Index';
import User_Login from './Components/User_Login';
import Home from './Components/Home';
import Admin_Login from './Components/Admin_Login';
import AdminIndex from './Components/AdminIndex/AdminIndex';
import ChangePassword from './Components/AdminIndex/ChangePassword';
import AdminHome from './Components/AdminIndex/AdminHome';
import User_Register from './Components/User_Register';
import PageNotFount from './Components/PageNotFount';
import RegUser from './Components/AdminIndex/RegUser';
import UpdateUser from './Components/AdminIndex/UpdateUser';
import UserHome from './Components/UserIndex/UserHome';
import UserIndex from './Components/UserIndex/UserIndex';
import AddProduct from './Components/AdminIndex/AddProduct';
import AddCategory from './Components/AdminIndex/AddCategory';
import ViewCategory from './Components/AdminIndex/ViewCategory';
import EditCategory from './Components/AdminIndex/EditCategory';
import ViewProduct from './Components/AdminIndex/ViewProduct';
import EditProduct from './Components/AdminIndex/EditProduct';
import UserChangePassword from './Components/UserIndex/UserChangePassword';
import SendFeedback from './Components/UserIndex/SendFeedback';
import ViewFeedback from './Components/AdminIndex/ViewFeedback';
import ViewProduct1 from './Components/UserIndex/ViewProduct1';
import ProductDashboard from './Components/UserIndex/ProductDashboard';
import FruitsProduct from './Components/UserIndex/FruitsProduct';
import AddToCartButton from './Components/UserIndex/AddToCartButton';
import ViewCart from './Components/UserIndex/ViewCart';
import Checkout from './Components/UserIndex/Checkout';
import Payment from './Components/UserIndex/Payment';
import AddBookingButton from './Components/UserIndex/AddBookingButton';
import ViewBooking from './Components/UserIndex/ViewBooking';
import BookingDetail from './Components/UserIndex/BookingDetail';
import Profile from './Components/UserIndex/Profile';
import AdminViewBooking from './Components/AdminIndex/AdminViewBooking';
import AdminBookingDetail from './Components/AdminIndex/AdminBookingDetail';
import ChangeStatus from './Components/AdminIndex/ChangeStatus';
import Search from './Components/AdminIndex/Search';
import DateReport from './Components/AdminIndex/DateReport';
import About from './Components/About';
import Contact from './Components/Contact';

function App() {
  return (
   <Routes>
        <Route path="*" element={<PageNotFount />} />
        <Route path="/" element={<Index />} >
          <Route path="" element={<Home />} />
          <Route path="/register" element={<User_Register />} />
          <Route path="/user_login" element={<User_Login />} />
          <Route path="/admin_login" element={<Admin_Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/" element={<UserIndex />} >
          <Route path="userIndex" element={<UserHome />} />
          <Route path="userIndex/change" element={<UserChangePassword />} />
          <Route path="userIndex/sendFeedback" element={<SendFeedback />} />
          <Route path="userIndex/viewCart" element={<ViewCart />} />
          <Route path="userIndex/checkout/:id" element={<Checkout />} />
          <Route path="userIndex/payment/:id" element={<Payment />} />
          <Route path="userIndex/ViewBooking" element={<ViewBooking />} />
          <Route path="userIndex/bookingDetail/:id" element={<BookingDetail />} />
          <Route path="userIndex/profile" element={<Profile />} />
          <Route path="userIndex/ViewProduct1" element={<ViewProduct1 />}>
          <Route path="" element={<ProductDashboard />} />
          <Route path="user-product/:id" element={<FruitsProduct />} />
          <Route path="product/:id" element={<AddToCartButton />} />
          <Route path="addBooking/:id" element={<AddBookingButton />} />
          
            
          </Route>
          
        </Route>
        <Route path="/" element={<AdminIndex />} >
          <Route path="adminIndex" element={<AdminHome />} />
          <Route path="adminIndex/reg_user" element={<RegUser />} />
          <Route path="adminIndex/userEdit/:id" element={<UpdateUser />} />
          <Route path="adminIndex/change" element={<ChangePassword />} />
          <Route path="adminIndex/addProduct" element={<AddProduct />} />
          <Route path="adminIndex/view_Product" element={<ViewProduct />} />
          <Route path="adminIndex/editProduct/:id" element={<EditProduct />} />
          <Route path="adminIndex/add_category" element={<AddCategory />} />
          <Route path="adminIndex/view_Category" element={<ViewCategory />} />
          <Route path="adminIndex/editCategory/:id" element={<EditCategory />} />
          <Route path="adminIndex/viewFeedback" element={<ViewFeedback />} />
          <Route path="adminIndex/adminViewBooking" element={<AdminViewBooking />} />
          <Route path="adminIndex/adminBookingDetail/:id" element={<AdminBookingDetail />} />
          <Route path="adminIndex/changeStatus/:id" element={<ChangeStatus />} />
          <Route path="adminIndex/search" element={<Search />} />
          <Route path="adminIndex/dateReport" element={<DateReport />} />
        </Route>
    </Routes>
  );
}

export default App;
