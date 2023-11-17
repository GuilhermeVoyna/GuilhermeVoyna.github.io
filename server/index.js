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
            res.status(201).json({token, userId: user.user_id})
        }
        res.status(400).send("Invalid credentials");
    }catch (err) {
        console.log(err);
    }

});

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
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
        tips: formData.tips,
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
    const matchedTipIds = req.query.matchedTipIds;
    if (Array.isArray(matchedTipIds)) {
      const query = { 
        tip_id: { $nin: matchedTipIds }, 
      };
      const returnTips = await tips.find(query).toArray();
      
      res.send(returnTips);
    } else {
      res.status(400).send("Invalid 'matchedTipIds' parameter. It should be an array.");
      
    }
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
      about: tipData.about,
    };

    const insertTip = await tips.insertOne(newTip);
    res.send(insertTip);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

app.get ('/tips-match', async (req, res) => {
  const client = new MongoClient(uri)
  const matchedTipIds = req.query.matchedTipIds

  if (!Array.isArray(matchedTipIds)) {
    res.status(400).send('matchedTipIds must be an array');
    return;
  }

  try {
    await client.connect()
    const database = client.db('app-data')
    const tips = database.collection('tips')
    console.log(matchedTipIds,"matchedTipIds")
    const query = {tip_id: {$in: matchedTipIds}}
    const foundTips = await tips.find(query).toArray()
    res.json(foundTips)

  } finally {
    await client.close()
  }
})

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


app.put('/addmatch', async (req, res) => {
  const client = new MongoClient(uri)
  const {swipedTipId,swipedUserId,userId} = req.body
  const matchedTipId = [swipedUserId,swipedTipId,userId]
  const matchedTipIdOtherUser = [userId,swipedTipId,swipedUserId]
  try {
      await client.connect()
      const database = client.db('app-data')
      const users = database.collection('users')
      const queryOtherUser = {user_id: swipedUserId}
      const query = {user_id: userId}
      const updateDocument = {
          $addToSet: { tips: {tip_id: swipedTipId},
            matches: matchedTipId
                }
      }
      const updateDocumentOtherUser = {
        $addToSet: { tips: {tip_id: swipedTipId},
          matches: matchedTipIdOtherUser
              }
    }
      const user = await users.updateOne(query, updateDocument)
      await users.updateOne(queryOtherUser, updateDocumentOtherUser)
      res.send(user)
  } finally {
      await client.close()
  }
})

app.listen(PORT, () => console.log("server running on PORT " + PORT));
