const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const products = require("../interface/interface");

const app = express();
const port = 4000;

const uri = "mongodb://127.0.0.1:27017/thavmaHairs";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.use('/login', express.static('dist'))
app.use('/cart', express.static('dist'))
app.use('./imagepage', express.static('images'))
app.use('./imagepage', express.static('imagepage'))

//to upload image
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' +file.originalname)
//   }
// })
// const upload = multer({ storage: storage }).single('file')


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
  _Id: Number,
  Id: Number,
  productName: String,
  Price: Number,
  Description: String,
  Image: String,
});

const ThavmaDataModel = mongoose.model("ThavmaData", ThavmaDataSchema);

app.get("/products", (req, res) => {
  db.getCollection('ThavmaData').find({});
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
    token: '1234'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
