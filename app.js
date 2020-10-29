const express = require('express');

// database
const db = require("./fakeDb");

// routers
const itemsRouter = require("./itemsRouter")

const app = express();

// useful error class to throw
const { NotFoundError } = require('./expressError');

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

// switch to items router
app.use("/items", itemsRouter);


// error routes
app.use(function (req, res, next) {
  console.log("not found");
  return next(new NotFoundError("Page Not Found"))
})

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
})

module.exports = app;