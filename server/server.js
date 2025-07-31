const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use('/api/items', require("./routes/items"));
app.use('/api/auth', require("./routes/authRoute"));
// app.use('/api/payment', cors(), require("./routes/payment")); // Uncomment when needed

// Start server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
