import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, Collection } from "mongodb";
import multer from "multer";
import { readFileSync } from "fs";

dotenv.config();

const url = process.env.MONGODBURL || "";
const port = process.env.PORT || 9000;
let accounts: Collection;
let images: Collection;

async function connectToDatabase() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db("photo-galery-1");
    accounts = database.collection("accounts");
    images = database.collection("images");
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

const upload = multer({ dest: "uploads/" });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/login", async (req: Request, res: Response) => {
  const { name, pass } = req.body;
  if (name && pass) {
    try {
      const account = await accounts.findOne({ name: name, pass: pass });
      if (!account) {
        res.send("Invalid");
      } else {
        res.send("OK");
      }
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  const { name, pass } = req.body;
  if (name && pass) {
    try {
      const account = await accounts.findOne({ name: name });
      if (!account) {
        await accounts.insertOne({ name: name, pass: pass });
        res.send("OK");
      } else {
        res.send("Chosse different name");
      }
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.post(
  "/uploadImage",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { name, pass } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).send("No image file uploaded");
    }

    try {
      const account = await accounts.findOne({ name: name, pass: pass });
      if (!account) {
        res.send("Invalid");
      } else {
        const imageData = readFileSync(imageFile.path);
        const base64Image = imageData.toString("base64");

        await images.insertOne({ name: name, image: base64Image, date: new Date() });

        res.send("Image received and processed");
      }
    } catch (error) {
      console.error("Error processing image", error);
      res.status(500).send("Error processing image");
    }
  }
);

app.post("/page/:pageNumber", async (req: Request, res: Response) => {
  const { name, pass } = req.body;
  const pageNumber:any = req.params.pageNumber
  if (name && pass) {
    try {
      const account = await accounts.findOne({ name: name });
      if (!account) {
        res.send({message: "Invalid"});
      } else {
        const imagesArray = await images
          .find({ name: name })
          .sort({ date: -1 })
          .skip(pageNumber*6)
          .limit(6)
          .toArray();
        // console.log(imagesArray)
        // console.log("page number: "+pageNumber);
        res.send({ message: "OK", images: imagesArray });
      }
    } catch (error) {
      console.error("Error querying the database", error);
      res.status(500).send("Internal server error");
    }
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
