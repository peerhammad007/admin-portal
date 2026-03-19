const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const policyRoutes = require("./routes/policyRoutes");
const { default: mongoose } = require("mongoose");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(policyRoutes);
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongodb connection error: ", err);
  });
