const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer');
const bcrypt = require("bcrypt");

const app = express();
const port = 4000;

const uri = "mongodb://127.0.0.1:27017/thavmaHairs";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.use('/login', express.static('dist'));
app.use('/cart', express.static('dist'));
app.use('/home', express.static('dist'));
app.use('/registerUsers', express.static('dist'));
app.use('/usersLogin', express.static('dist'));
app.use('/imagepage', express.static('images')); // Fixed the path to '/imagepage'

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a Mongoose schema and model for your "thavmaData" collection
const ThavmaDataSchema = new mongoose.Schema({
  _id: Number, // Changed from "_Id" to "_id"
  Id: Number,
  productName: String,
  price: Number,
  description: String,
  Image: String,
});

const ThavmaDataModel = mongoose.model("ThavmaData", ThavmaDataSchema);

// Create a storage engine using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Define your image upload path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  // Handle the uploaded data
  const { productName, price, description } = req.body;
  const image = req.file;

  // Validate that all required fields are present
  if (!productName || !price || !description || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Save this data to your database (e.g., MongoDB)
  const newProduct = new ThavmaDataModel({
    productName,
    Price: parseFloat(price), // Ensure price is parsed as a float
    Description: description,
    Image: `/images/${image.originalname}`, // The image path relative to your server
  });

  newProduct
    .save()
    .then(() => {
      res.status(201).json({ message: "Product uploaded successfully" });
    })
    .catch((error) => {
      console.error("Error saving product to the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

app.use(bodyParser.json());



app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/userlogin", async (req, res) => {
  const { username, password } = req.body;

  console.log("Received credentials:", { username, password });

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare encrypted passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/products", (_req, res) => {
  ThavmaDataModel.find({})
    .then(function (ThavmaData) {
      res.json(ThavmaData);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/store", async (req, res) => {
  try {
    const storeData = await ThavmaDataModel.find({}).exec();

    if (!storeData) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({ StoreData: storeData });
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use('/login', (req, res) => {
  res.send({
    token: '1234',
  });
});

app.get('/search', (req, res) => {
  const query = req.query.query || '';
  ThavmaDataModel.find({
    productName: { $regex: new RegExp(query, 'i') }, // Case-insensitive search
  })
    .then((searchResults) => {
      res.status(200).json({ results: searchResults });
    })
    .catch((error) => {
      console.error('Error searching for products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
