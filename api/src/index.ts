import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, Collection } from "mongodb";

dotenv.config();

const url = process.env.MONGODBURL || "";
const port = process.env.PORT || 9000;
let accounts: Collection;

async function connectToDatabase() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db("photo-galery-1");
    accounts = database.collection("accounts");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
}

connectToDatabase();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
