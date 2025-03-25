// THIS IS EXAMPLE CODE HOW YOU CAN USE NODE.JS WITH MONGODB

require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // Allow frontend access
app.use(express.json()); // Middleware to parse JSON

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const databaseName = "logsDB";
const collectionName = "logs";

// Save a log entry with timestamp
app.post("/logs", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    
    const logEntry = { message, timestamp: new Date() };
    await collection.insertOne(logEntry);
    
    res.json({ success: true, log: logEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve all logs
app.get("/logs", async (req, res) => {
  try {
    const db = client.db(databaseName);
    const collection = db.collection(collectionName);
    
    const logs = await collection.find().sort({ timestamp: -1 }).toArray();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
