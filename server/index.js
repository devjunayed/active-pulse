const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000 || process.env.PORT;

// middle ware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://devjunayed-active-pulse.web.app",
  ],
  credentials: true,
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xn5pw0i.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // collections
    const userCollection = client.db("activePulse").collection("users");
    const trainerCollection = client.db("activePulse").collection("trainers");

    const pendingTrainersCollection = client
      .db("activePulse")
      .collection("pendingTrainers");
    const bookItemCollection = client
      .db("activePulse")
      .collection("bookedItem");
    const newsLetterCollection = client
      .db("activePulse")
      .collection("newsLetter");


    // jwt related api
    app.post("/jwt", async(req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "24h"
      });

      res.send({token});
    })

    // middle wares
    const verifyToken = (req, res, next) => {
      if(!req.headers.authorization){
        return res.status(401).send({message: 'unauthorized access'})
      }

      const token = req.headers.authorization;
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err){
          return res.status(401).send({message: 'unauthorized access'})
        }
        req.decoded = decoded;
        next();

      })

    }
  // chekcing if the user is admin after verify token
  const verifyTrainerAdmin = async(req, res, next) => {
    const email = req.decoded.email;
    const query = {email: email};
    const user = await userCollection.findOne(query);
    const isAdmin = user?.role === 'admin';
    const isTrainer = user?.role === 'trainer';

    if(!isTrainer || !isAdmin){
        return res.status(403).send({message: 'forbidden access'});
    }
    next();
  }

  // checking if the user is trainer after verifying the token
  const verifyAdmin = async(req, res, next) => {
    const email = req.decoded.email;
    const query = {email: email};
    const user = await userCollection.findOne(query);
    const isAdmin = user.role === 'admin';

    if(!isAdmin){
      return res.status(403).send({message: 'forbidden access'});
    }
    next();
  }
    // booked item
    app.post("/book/item/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const slot = data.slot;

      const changeAvailability = await trainerCollection.updateOne(
        {
          _id: new ObjectId(id),
          "slots.slot": slot,
        },
        {
          $set: { "slots.$.isAvailable": false },
        }
      );

      if(changeAvailability.modifiedCount){
        const result = await bookItemCollection.insertOne(data);
        res.send(result);
      }else{
        res.send({message: "Slots already taken", err: true});
      }

      
    });

    // user to trainers approval api
    app.put("/user/to/trainer", verifyToken, verifyAdmin, async(req, res) =>{
      const data = req.body;
      const email = data.email;

      const changeStatus = await userCollection.updateOne({email: email}, {
        $set: {
          role: "trainer"
        }
      })
      const joinTrainer =  await trainerCollection.insertOne(data);
      const deleteTrainer = await pendingTrainersCollection.deleteOne({email: email});

      res.send(joinTrainer);

    })

    // trainer related api
    app.get("/trainer/:id",  async (req, res) => {
      const id = req.params.id;
      const result = await trainerCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/pending/trainers", verifyToken, verifyAdmin, async(req, res) => {
      const result = await pendingTrainersCollection.find().toArray();
      res.send(result);
    })
    
    app.get("/trainers", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

      var result = [];

      if(page && size){
         result = await trainerCollection
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();
      }else{
        result = await trainerCollection.find().toArray();
      }
      
      res.send(result);
    });

    app.get("/total-trainers", async (req, res) => {
      const result = await trainerCollection.estimatedDocumentCount();
      res.send({ count: result });
    });

    app.post("/trainer/new", verifyToken, async (req, res) => {
      const trainerInfo = req.body;
      const query = {email: trainerInfo.email};


      const isGmailExists = await pendingTrainersCollection.findOne(query);
      const isAlreadyTrainer = await trainerCollection.findOne(query);

      if(isGmailExists || isAlreadyTrainer){
        res.send({exists: true});
      }else{
        const result = await pendingTrainersCollection.insertOne(trainerInfo);
        res.send(result);
      }


     
    });

    // news letter related api
    app.get("/newsletter", verifyToken, verifyAdmin, async(req, res) => {
      const result = await newsLetterCollection.find().toArray();
      res.send(result);
    })

    app.post("/newsletter", async(req, res) =>{
      const info = req.body;
      const isExists = await newsLetterCollection.findOne({email: info.email});

      if(isExists){
        res.send({message: "Email already exists in newsletter", err: true})
      }else{
        const result = await newsLetterCollection.insertOne(info);
        res.send(result);
      }
    })

    // users related api
    app.post("/users", async (req, res) => {
      const info = req.body;
      const query = { email: info.email };
      const isInsertedAlready = await userCollection.findOne(query);

      if (isInsertedAlready) {
        res.send({ message: "Already Inserted", acknowledged: true });
      } else {
        const result = await userCollection.insertOne(info);
        res.send(result);
      }
    });

    app.get("/user", verifyToken, async(req, res) => {
      const email = req.query.email;
      const query = {email};
      const result = await userCollection.findOne(query);
      res.send(result);
    })
    // pinging
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Active pulse is running");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
