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

// Get all databases
app.get("/databases", async (req, res) => {
  try {
    await client.connect();
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    res.json(dbs.databases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all collections in a database
app.get("/collections/:dbName", async (req, res) => {
  const { dbName } = req.params;
  try {
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    res.json(collections.map((col) => col.name));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all data from a collection
app.get("/data/:dbName/:collectionName", async (req, res) => {
  const { dbName, collectionName } = req.params;
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
