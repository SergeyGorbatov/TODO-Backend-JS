require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, URL } = require("./config");

const apiRoutes = require("./src/modules/routes/task");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", apiRoutes);

const start = () => {
  try {
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server started on localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
