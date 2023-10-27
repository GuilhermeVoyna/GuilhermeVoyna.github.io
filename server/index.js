const PORT = 8000;

const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const uri =
  "mongodb+srv://gui:mypassword@Cluster0.8zn4iai.mongodb.net/?retryWrites=true&w=majority";
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello App");
});


app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generateUserId = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }
    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generateUserId,
      email: sanitizedEmail,
      hashed_password: hashPassword,
    };
    const insertUser = await users.insertOne(data);

    const token = jwt.sign(insertUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token});
    console.log("User created");
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const user = await users.findOne({ email });

        const correctPassword = await bcrypt.compare(password, user.hashed_password);

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24,
            });
            res.status(201).json({ token});
        }
        res.status(400).send("Invalid credentials");
    }catch (err) {
        console.log(err);
    }

});


app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnUsers = await users.find().toArray();
    res.send(returnUsers);
  } finally {
    await client.close();
  }
});


app.put('/user', async (req, res) => {
  const client = new MongoClient(uri);
  const fromData = req.body.fromData;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: fromData.user_id };
    const updateDocument = {
      $set: {
        first_name: fromData.first_name,
        dob_day: fromData.dob_day,
        dob_month: fromData.dob_month,
        dob_year: fromData.dob_year,
        show_gender: fromData.show_gender,
        gender_identity: fromData.gender_identity,
        gender_interest: fromData.gender_interest,
        url: fromData.url,
        about: fromData.about,
        matches: fromData.matches,
      },
    };
    const insertUser = await users.updateOne(query, updateDocument);
    res.send(insertUser);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("server running on PORT " + PORT));
