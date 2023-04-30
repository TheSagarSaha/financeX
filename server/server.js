require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose")
const app = express();
const port = process.env.PORT || 5000;
const dbo = require("./db/conn");

app.use(express.json());
app.use("/", require("./routes/router"));

mongoose.connect(process.env.ATLAS_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
})
.catch((error) => {
  console.log(error);
})

 