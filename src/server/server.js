import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";

const client = new MongoClient("mongodb://0.0.0.0:27017", {
  monitorCommands: true,
});

client.on("commandStarted", (started) => console.log(started));
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.set("Access-Control-Allow-Origin", "*");

const port = 4000;
app.use(express.json());
app.use("/", express.static("dist"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });