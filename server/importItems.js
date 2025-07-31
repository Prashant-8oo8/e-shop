// importItems.js
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const items = require("./itemsCollection");

const MONGO_URI = "mongodb+srv://prashant32064:gHovbEjuT5qhxeT0@cluster0.urpgpge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // <-- Replace with your URI

// Define the schema
const itemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  category: String,
  color: String,
  type: String,
  description: String,
  price: Number,
  size: [String],
  highlights: [String],
  image: [
    {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date,
  __v: Number
});

const Item = mongoose.model("Item", itemSchema);

async function insertItems() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB");

    // Convert _id fields to ObjectId if needed
    const formattedItems = items.map(item => ({
      ...item,
      _id: new ObjectId(item._id)
    }));

    // await Item.deleteMany({}); // optional: clear old data
    await Item.insertMany(formattedItems);
    console.log("Items inserted successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error inserting items:", err);
    await mongoose.disconnect();
  }
}

insertItems();
