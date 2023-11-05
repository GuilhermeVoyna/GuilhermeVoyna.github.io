const PORT = 8000;

const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const uri =
  "mongodb+srv://gui:mypassword@Cluster0.8zn4iai.mongodb.net/?retryWrites=true&w=majority";
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const e = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello App");
});


app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
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
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashPassword,
    };
    const insertUser = await users.insertOne(data);

    const token = jwt.sign(insertUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({token, userId: generatedUserId})
    console.log("User created");
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;
    console.log(email, password);

    try {
        await client.connect();
        const database = client.db("app-data");
        const users = database.collection("users");

        const user = await users.findOne({ email });
        console.log(email, password);

        const correctPassword = await bcrypt.compare(password, user.hashed_password);

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24,
            });
            res.status(201).json({token, userId: user.user_id})
            console.log(user);
        }
        res.status(400).send("Invalid credentials");
    }catch (err) {
        console.log(err);
    }

});


app.get('/gendered-users', async (req, res) => {
  const client = new MongoClient(uri)
  const account_search = req.query.account_search

  try {
      await client.connect()
      const database = client.db('app-data')
      const users = database.collection('users')
      const query = {account_type: {$eq: account_search}}
      const foundUsers = await users.find(query).toArray()
      res.json(foundUsers)

  } finally {
      await client.close()
  }
})





app.put('/user', async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        premium: formData.premium,
        account_type: formData.account_type,
        account_search: formData.account_search,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
        tips: formData.tips
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

app.get('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  try {
      await client.connect()
      const database = client.db('app-data')
      const users = database.collection('users')

      const query = {user_id: userId}
      const user = await users.findOne(query)
      res.send(user)

  } finally {
      await client.close()
  }
})

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

app.get("/tips", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const tips = database.collection("tips");

    const returnTips = await tips.find().toArray();
    res.send(returnTips);
  } finally {
    await client.close();
  }
});


app.put('/tip', async (req, res) => {
  const client = new MongoClient(uri);
  const tipData = req.body.tipData;
  const generatedTipId = uuidv4();

  try {
    await client.connect();
    const database = client.db('app-data');
    const tips = database.collection('tips');

    const newTip = {
      title: tipData.title,
      user_id: tipData.user_id,
      tip_id: generatedTipId,
      country: tipData.country,
      day: tipData.day,
      month: tipData.month,
      year: tipData.year,
      type: tipData.type,
      url: tipData.url, 
    };

    const insertTip = await tips.insertOne(newTip);
    res.send(insertTip);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});


app.get('filtered-tips', async (req, res) => {
  const client = new MongoClient(uri)
  const type = req.query.type

  try {
      await client.connect()
      const database = client.db('app-data')
      const tips = database.collection('tips')
      const query = {account_type: {$eq: type}}
      const foundTips = await tips.find(query).toArray()
      res.json(foundTips)

  } finally {
      await client.close()
  }
})


app.listen(PORT, () => console.log("server running on PORT " + PORT));
