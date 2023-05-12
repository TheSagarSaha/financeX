require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const router = require("./routes/router")
const cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/pages", express.static('../client/src/pages'));
app.use(express.json());
app.use("/", router);
app.use(cors())

mongoose.connect(process.env.ATLAS_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
})
.catch((error) => {
  console.log(error);
})
