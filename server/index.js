const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config()
const app = express();

app.use(
  cors({ origin: ['https://itra-course-work.herokuapp.com', 'http://localhost:3000'] })
);

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/collection", require("./routes/collection.routes"));
app.use("/api/item", require("./routes/item.routes"));
app.use("/api/comment", require("./routes/comment.routes"));

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    await mongoose.connect(process.env.DB_URL || "mongodb+srv://nastya:kokokosha14@cluster0.knqnp.mongodb.net/?retryWrites=true&w=majority");
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
