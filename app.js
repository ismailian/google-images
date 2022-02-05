const express = require("express");
const cors = require("cors");

/**
 * load env variables
 */
require("dotenv").config();

/**
 * instantiate express app
 */
const app = express();

/**
 * configurate express app
 */
app.use(cors());

/**
 * handle routing
 */
app.use("/api/v1/", require("./routes/api/v1"));

/**
 * start web service
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Web service started on: ${port}`));
