const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const AdminModel = require('./models/Admin');
const UserSchema = require('./models/User');
const CategorySchema = require('./models/Category');
const CategoryModel = require('./models/Category');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/User');
const ProductSchema = require('./models/Product');
const FeedbackSchema = require('./models/Feedback');
const ProductModel = require('./models/Product');
const CartModel = require('./models/Cart');
const BookingModel = require('./models/Booking');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors(
  {
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
  }
));
app.use(cookieParser());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage
})

mongoose.connect('mongodb://127.0.0.1:27017/shoes_Shop');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "The token was not available" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.error(err);
        return res.json({ Error: "Token is wrong" });
      }
      console.log('Decoded Token:', decoded);
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get('/home',verifyUser, (req, res) => {
  return res.json({Status: "Success", role: req.role, id: req.id})
})

// Start Admin All code *****

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  AdminModel.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: 'Incorrect password.' });
      }

      const token = jwt.sign(
        { role: 'admin', id: user._id, username: user.username },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token);

      res.json({ message: "Login successful" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Database error.' });
    });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json( {Status: 'Logout successful'});
});

app.get('/reg_user', (req, res) => {
  UserSchema.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user data' });
    });
});

app.get('/get_user/:id', (req, res) => {
  const userId = req.params.id;

  UserSchema.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Return the user data as a JSON response
      res.json(user);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: 'Failed to retrieve user data.', details: err.message });
    });
});
// ...

app.put('/update_user/:id', verifyUser, upload.single('image'), (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, username, contact, email, city, birth, address } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }

  UserSchema.findById(userId)
    
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      user.firstname = firstname;
      user.lastname = lastname;
      user.username = username;
      user.contact = contact;
      user.email = email;
      user.city = city;
      user.birth = birth;
      user.address = address;

      // Check if a new image is uploaded
      if (req.file) {
        user.image = req.file.filename;
      }

      // Save the updated user
      user.save()
        .then((updatedUser) => {
          return res.json(updatedUser);
        })
        .catch((err) => {
          return res.status(500).json({ error: 'User update failed.' });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: 'User update failed.' });
    });
});

app.delete('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }

  try {
    // Find and delete related bookings first
    await BookingModel.deleteMany({ userId: userId });

    // Find and delete related cart items
    await CartModel.deleteMany({ userId: userId });

    // Then delete the user
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ Status: 'Success', message: 'User, associated bookings, and cart items deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user, associated bookings, and cart items.' });
  }
});

app.put('/changePassword', verifyUser, (req, res) => {
  const userId = req.id;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }

  AdminModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Compare the provided current password with the stored password (not recommended)
      if (currentPassword !== user.password) {
        return res.status(400).json({ error: 'Current password is incorrect.' });
      }

      // Update the user's password with the new password (not recommended)
      user.password = newPassword;
      user.save()
        .then((updatedUser) => {
          // Password changed successfully
          res.status(200).json({ message: 'Password changed successfully' });
        })
        .catch((saveErr) => {
          console.error(saveErr);
          res.status(500).json({ error: 'User update failed.' });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Password change failed.' });
    });
});

app.post('/addCategory', (req, res) => {
  const { categoryname } = req.body;

  CategorySchema.create({ categoryname })
    .then(category => res.json(category))
    .catch(err => res.status(500).json({ error: 'Category creation failed' }));
});

app.get('/view_Category', (req, res) => {
  CategorySchema.find()
    .then(category => {
      res.json(category);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve Category data' });
    });
});

app.get('/getCategory/:id', (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID.' });
  }

  CategorySchema.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: 'Category not found.' });
      }
      res.status(200).json({ Status: 'Success', category });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve category.' });
    });
});

app.put('/updateCategory/:id', (req, res) => {
  const categoryId = req.params.id;
  const { categoryname } = req.body;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID.' });
  }

  CategorySchema.findByIdAndUpdate(
    categoryId,
    { categoryname: categoryname },
    { new: true }
  )
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found.' });
      }
      res.status(200).json({ Status: 'Success', message: 'Category updated successfully.', updatedCategory });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update category.' });
    });
});

app.delete('/deleteCategory/:id', async (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID.' });
  }

  try {
    // Find and delete related products first
    await ProductModel.deleteMany({ categoryId: categoryId });

    const deletedCategory = await CategorySchema.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.status(200).json({ Status: 'Success', message: 'Category deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

app.post('/addProduct', upload.single('productimg'), (req, res) => {
  const { productname, categoryId, productprice, description } = req.body;
  const productimg = req.file ? req.file.filename : null;

  ProductSchema.create({ productname, categoryId, productimg, productprice, description })
    .then(product => res.json(product))
    .catch(err => res.status(500).json({ error: 'Product creation failed' }));
});

app.get('/view_Product', (req, res) => {
  try {
    ProductModel.find()
      .populate('categoryId')
      .exec()
      .then(products => {
        res.json(products);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve Product data' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getProduct/:id', (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  ProductSchema.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.status(200).json({ Status: 'Success', product });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve product.' });
    });
});

app.put('/UpdateProduct/:id', upload.single('productimg'), (req, res) => {
  const productId = req.params.id;
  const { productname, categoryId, productprice, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  const updateFields = { productname, categoryId, productprice, description };

  // Check if a file was uploaded
  if (req.file) {
    updateFields.productimg = req.file.filename; // Store the uploaded file's filename
  }

  ProductSchema.findByIdAndUpdate(
    productId,
    updateFields,
    { new: true }
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.status(200).json({ Status: 'Success', message: 'Product updated successfully.', updatedProduct });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update product.' });
    });
});

app.delete('/deleteProduct/:id', (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  ProductSchema.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.status(200).json({ Status: 'Success', message: 'Product deleted successfully.' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete Product.' });
    });
});

app.get('/userCount', async (req, res) => {
  try {
    const userCount = await UserModel.countDocuments();
    res.json([{ user: userCount }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/bookingCount', async (req, res) => {
  try {
    const bookingCount = await BookingModel.countDocuments();
    res.json([{ booking: bookingCount }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/productCount', async (req, res) => {
  try {
    const productCount = await ProductModel.countDocuments();
    res.json([{ product: productCount }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/adminViewBooking', async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate({
        path: 'products.productId',
        select: 'productname productprice productimg description',
      })
      .populate('userId', 'username email'); // Populate the userId field with the 'username' property

    if (!bookings) {
      return res.status(404).json({ Status: 'Error', error: 'Bookings not found.' });
    }

    // Extracting required data for frontend
    const bookingData = bookings.map(booking => ({
      userId: booking.userId.username, // Access the username property from the populated user object
      email: booking.userId.email, // Access the username property from the populated user object
      _id: booking._id,
      bookingId: booking.bookingId,
      date: booking.date,
      products: booking.products.map(product => ({
        productId: {
          productname: product.productId.productname,
          productprice: product.productId.productprice,
          productimg: product.productId.productimg,
          description: product.productId.description,
        },
        quantity: product.quantity,
      })),
      status: booking.status,
    }));

    res.status(200).json({ Status: 'Success', bookingData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Status: 'Error', error: 'Failed to retrieve booking data.' });
  }
});

app.get('/adminbookingDetail/:id', (req, res) => {
  const bookingId = req.params.id;

  // Validate the booking ID
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: 'Invalid booking ID.' });
  }

  // Find the booking by ID
  BookingModel.findById(bookingId)
    .populate({
      path: 'products.productId',
      select: 'productname productprice productimg description',
    })
    .populate('userId', 'username email firstname lastname address contact image') 
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found.' });
      }

      // Extract required data for frontend
      const bookingDetails = {
        bookingId: booking.bookingId,
        date: booking.date,
        status: booking.status,
        user: {
          username: booking.userId.username,
          email: booking.userId.email,
          firstname: booking.userId.firstname,
          lastname: booking.userId.lastname,
          address: booking.userId.address,
          contact: booking.userId.contact,
          image: booking.userId.image,
        },
        products: booking.products.map(product => ({
          productId: {
            productname: product.productId.productname,
            productprice: product.productId.productprice,
            productimg: product.productId.productimg,
            description: product.productId.description,
          },
          quantity: product.quantity,
        })),
        status: booking.status,
      };

      res.status(200).json({ Status: 'Success', bookingDetails });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ Status: 'Error', error: 'Failed to retrieve booking details.' });
    });
});

app.put("/updateBooking/:id", (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  // Validate the booking ID
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: "Invalid booking ID." });
  }

  // Find and update the booking status by ID
  BookingModel.findByIdAndUpdate(
    bookingId,
    { status: status },
    { new: true } // To return the updated document
  )
    .then((updatedBooking) => {
      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found." });
      }
      res.status(200).json({ status: "Success", message: "Status updated successfully." });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: "Error", error: "Failed to update status." });
    });
});

app.delete('/deleteBooking/:id', (req, res) => {
  const bookingId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: 'Invalid Feed ID.' });
  }

  BookingModel.findByIdAndDelete(bookingId)
    .then((deletedBooking) => {
      if (!deletedBooking) {
        return res.status(404).json({ error: 'Feed not found.' });
      }
      res.status(200).json({ Status: 'Success', message: 'Feed Booking successfully.' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete Booking.' });
    });
});

app.get("/searchBooking", async (req, res) => {
  const { bookingId } = req.query;

  try {
    const result = await BookingModel.find({ bookingId: bookingId })
      .populate('userId', 'username email') // Populate the userId field with username and email
      .populate('products.productId', 'productname productprice'); // Populate the products array with productName and productPrice

    res.json({ Result: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/searchReport", async (req, res) => {
  const { fromdate, todate } = req.body;

  try {
    const result = await BookingModel.find({
      date: { $gte: new Date(fromdate), $lte: new Date(todate) }
    })
    .populate('userId', 'username email') // Populate the userId field with username and email
    .populate('products.productId', 'productname productprice'); // Populate the products array with productName and productPrice

    res.json(result);
  } catch (error) {
    console.error("Error searching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// End Admin code *****


// Start User code *****

app.post('/register', upload.single('image'), (req, res) => {
  const { firstname, lastname, username, contact, email, city, birth, address, password } = req.body;

  UserSchema.findOne({ $or: [{ email: email }, { username: username }] })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: 'User with the same email or username already exists.' });
      }

      bcrypt.hash(password, 10)
        .then((hash) => {
          const image = req.file ? req.file.filename : null; // Get the image filename

          const newUser = new UserSchema({
            firstname,
            lastname,
            username,
            contact,
            email,
            city,
            birth,
            address,
            image, // Use the image filename
            password: hash, // Use the hashed password
          });

          newUser.save()
            .then((savedUser) => {
              res.json(savedUser);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: 'User registration failed.' });
            });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: 'User registration failed.' });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'User registration failed.' });
    });
});

app.post('/userLogin', (req, res) => {
  const { username, password } = req.body;

  UserSchema.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Password comparison failed.' });
        }

        if (!result) {
          return res.status(401).json({ error: 'Incorrect password.' });
        }

        const token = jwt.sign(
          { role: 'user', id: user._id, username: user.username },
          "jwt-secret-key",
          { expiresIn: "1d" }
        );

        res.cookie("token", token);

        res.json({ message: "Login successful" });
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Database error.' });
    });
});

app.put('/user_changePassword', verifyUser, (req, res) => {
  const userId = req.id;
  const { currentPassword, newPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      bcrypt.compare(currentPassword, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Password comparison failed.' });
        }

        if (!result) {
          return res.status(400).json({ error: 'Current password is incorrect.' });
        }

        bcrypt.hash(newPassword, 10, (hashErr, hash) => {
          if (hashErr) {
            return res.status(500).json({ error: 'Password hashing failed.' });
          }

          user.password = hash;
          user.save()
            .then((updatedUser) => {
              // Password changed successfully
              res.status(200).json({ message: 'Password changed successfully' });
            })
            .catch((saveErr) => {
              console.error(saveErr);
              res.status(500).json({ error: 'User update failed.' });
            });
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Password change failed.' });
    });
});

app.get('/userProfile', verifyUser, (req, res) => {
  const userId = req.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ Status: 'Error', error: 'Invalid user ID.' });
  }

  UserModel.findById(userId)
    .then((profile) => {
      if (!profile) {
        return res.status(404).json({ Status: 'Error', error: 'User profile not found.' });
      }

      return res.status(200).json({ Status: 'Success', Result: profile });
    })
    .catch((err) => {
      console.error('Error retrieving user profile:', err);
      return res.status(500).json({ Status: 'Error', error: 'An error occurred while retrieving user profile.' });
    });
});

app.post('/addFeedback', verifyUser, (req, res) => {
  const { feedname, feedemail, feedcontact, feeddescription } = req.body;
  const userId = req.id;
  console.log(userId)
  FeedbackSchema.create({
    feedname,
    feedemail,
    feedcontact,
    feeddescription,
    userId: userId,
  })
  .then(feedback => {
    res.json(feedback);
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Failed to add feedback.' });
  });
});

app.get('/manage_feedback', (req, res) => {
  FeedbackSchema.find()
    .then(feed => {
      res.json(feed);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve Feed data' });
    });
});

app.delete('/deleteFeed/:id', (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid Feed ID.' });
  }

  FeedbackSchema.findByIdAndDelete(userId)
    .then((deletedFeed) => {
      if (!deletedFeed) {
        return res.status(404).json({ error: 'Feed not found.' });
      }
      res.status(200).json({ Status: 'Success', message: 'Feed deleted successfully.' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete feed.' });
    });
});

app.get('/products_by_category/:id', (req, res) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ error: 'Invalid category ID.' });
  }

  ProductSchema.find({ categoryId: categoryId })
    .then((products) => {
      if (!products || products.length === 0) {
        return res.status(404).json({ error: 'No products found for this category.' });
      }
      res.status(200).json({ Status: 'Success', products });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve products for the category.' });
    });
});

app.post('/addToCart/:productId', verifyUser, async (req, res) => {
  const productId = req.params.productId;
  const userId = req.id; // Extract user ID from the authenticated user

  // Check if the product ID is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  try {
    // Find the user's cart
    let cart = await CartModel.findOne({ userId: userId });

    // If cart does not exist, create a new one
    if (!cart) {
      cart = new CartModel({ userId: userId, products: [] });
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.products.find(product => product.productId.equals(productId));

    if (existingProduct) {
      // If the product exists, increment the quantity
      existingProduct.quantity += 1;
    } else {
      // If the product does not exist, add it to the cart with quantity 1
      cart.products.push({ productId: productId, quantity: 1 });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ status: 'Success', message: 'Product added to cart successfully.', cart: cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

app.get('/view_Cart', verifyUser, (req, res) => {
  const userId = req.id; // Get user ID from the authenticated user

  // Find the user's cart
  CartModel.findOne({ userId: userId })
    .populate({
      path: 'products.productId',
      select: 'productname productprice productimg description', // Include 'productimg' field in select
    })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ Status: 'Error', error: 'Cart not found.' });
      }

      res.status(200).json({ Status: 'Success', cart });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ Status: 'Error', error: 'Failed to retrieve cart data.' });
    });
});

app.delete('/deleteCartItem/:id', verifyUser, async (req, res) => {
  const cartItemId = req.params.id;

  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId: req.id },
      { $pull: { products: { _id: cartItemId } } },
      { new: true }
    );

    if (cart) {
      res.status(200).json({ Status: 'Success', message: 'Cart item deleted successfully.', cart });
    } else {
      res.status(404).json({ Status: 'Error', message: 'Cart item not found.' });
    }
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ Status: 'Error', message: 'Failed to delete cart item.' });
  }
});

app.get('/cartCount', verifyUser, async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.id }); // Find the cart for the authenticated user
    if (cart) {
      const uniqueProductCount = cart.products.length; // Count the number of unique products in the cart
      res.json({ cart: { uniqueProductCount } });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Import the uuid library

app.get('/cartCheckout/:id', verifyUser, (req, res) => {
  const cartId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ error: 'Invalid cart ID.' });
  }

  const bookingId = crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate a unique Booking Id using UUID

  CartModel.findById(cartId)
    .populate('userId', 'username email city contact address')
    .populate('products.productId', 'productname productprice')
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found.' });
      }
      res.status(200).json({ status: 'Success', cart, bookingId }); // Send the Booking Id along with the response
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve cart.' });
    });
});

app.post('/addbooking/:cartId', async (req, res) => {
  const cartId = req.params.cartId;

  try {
    const cart = await CartModel.findById(cartId).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    const bookingProducts = cart.products.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));
    const bookingId = crypto.randomBytes(3).toString('hex').toUpperCase(); // Generate bookingId
    const bookingData = {
      bookingId: bookingId,
      userId: cart.userId, // Assuming you have userId in your Cart model
      products: bookingProducts,
      // Add more fields to your booking data as needed
    };

    const newBooking = new BookingModel(bookingData);
    await newBooking.save();

    await CartModel.findByIdAndDelete(cartId);

    res.status(200).json({ status: 'Success', message: 'Booking created successfully.', bookingId: bookingId });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking.' });
  }
});

app.get('/viewBooking', verifyUser, async (req, res) => {
  const userId = req.id;

  try {
    const bookings = await BookingModel.find({ userId: userId })
      .populate({
        path: 'products.productId',
        select: 'productname productprice productimg description',
      });

    if (!bookings) {
      return res.status(404).json({ Status: 'Error', error: 'Bookings not found.' });
    }

    // Extracting required data for frontend
    const bookingData = bookings.map(booking => ({
      _id: booking._id,
      bookingId: booking.bookingId,
      date: booking.date,
      products: booking.products.map(product => ({
        productId: {
          productname: product.productId.productname,
          productprice: product.productId.productprice,
          productimg: product.productId.productimg,
          description: product.productId.description,
        },
        quantity: product.quantity,
      })),
      status: booking.status,
    }));

    res.status(200).json({ Status: 'Success', bookingData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Status: 'Error', error: 'Failed to retrieve booking data.' });
  }
});

app.get('/bookingDetail/:id', verifyUser, (req, res) => {
  const bookingId = req.params.id;

  // Validate the booking ID
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: 'Invalid booking ID.' });
  }

  // Find the booking by ID
  BookingModel.findById(bookingId)
    .populate({
      path: 'products.productId',
      select: 'productname productprice productimg description',
    })
    .then((booking) => {
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found.' });
      }

      // Extract required data for frontend
      const bookingDetails = {
        bookingId: booking.bookingId,
        date: booking.date,
        products: booking.products.map(product => ({
          productId: {
            productname: product.productId.productname,
            productprice: product.productId.productprice,
            productimg: product.productId.productimg,
            description: product.productId.description,
          },
          quantity: product.quantity,
        })),
        status: booking.status,
      };

      res.status(200).json({ Status: 'Success', bookingDetails });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ Status: 'Error', error: 'Failed to retrieve booking details.' });
    });
});

app.get('/profile', verifyUser, async (req, res) => {
  const userId = req.id;
  try {
    const user = await UserModel.findOne({_id : userId});
    res.json({ Status: 'Success', Result: user });
  } catch (error) {
    res.status(500).json({ Status: 'Error', Error: error.message });
  }
});

app.put('/updateProfile', verifyUser, upload.single('image'), async (req, res) => {
  const userId = req.id;
  const { firstname, lastname, contact, email, city, birth, address } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        firstname,
        lastname,
        contact,
        email,
        city,
        birth,
        address,
        image,
      },
      { new: true, upsert: true }
    );
    res.json({ Status: 'Success', Result: user });
  } catch (error) {
    res.status(500).json({ Status: 'Error', Error: error.message });
  }
});


app.get("/searchProduct", async (req, res) => {
  const { product } = req.query;

  try {
    const result = await ProductModel.find({
      productname: { $regex: new RegExp(product, "i") },
    });

    res.json({ Result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// End User code *****

app.listen(8081, () => {
  console.log('Server is running on port 8081');
});