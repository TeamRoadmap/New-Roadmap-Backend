require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/");

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: whitelist }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", indexRouter);

module.exports = app;
