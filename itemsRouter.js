const express = require("express");

const { BadRequestError, NotFoundError } = require("./expressError");

const db = require("./fakeDb");
const router = new express.Router();

router.get("/", function (req, res, next) {
  try {
    return res.json({ items: db.items })
  } catch (err) {
    return next(err);
  }
});

router.post("/", function (req, res, next) {
  try {
    db.items.push(req.body);
    return res.json({ added: db.items[db.items.length - 1] })
  } catch (err) {
    return next(err);
  }
});

router.get("/:name", function (req, res, next) {
  try {
    let itemName = req.params.name;
    let result = db.items.find(obj => obj["name"] === itemName);
    if (!result) throw new BadRequestError(message = "Item does not exist");
    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

router.patch("/:name", function (req, res, next) {
  try {
    let itemName = req.params.name;
    let newItem = req.body;
    let result = db.items.find(obj => obj["name"] === itemName);
    // db.items.find(obj => {
    //   if (obj["name"] === itemName) {
      //   obj = newItem;
    //     obj["name"] = newItem.name;
    //     obj["price"] = newItem.price;

    //     return res.json({ updated: obj });
    //   }
    // });

    result.name = newItem.name;
    result.price = newItem.price;
    throw new BadRequestError(`${itemName} not found`)

  } catch (error) {
    return next(error);
  }
});

router.delete("/:name", function (req, res, next) {
  try {
    let itemName = req.params.name;

    db.items.forEach((obj, i, arr) => {
      if (obj["name"] === itemName) {
        arr.splice(i, 1);

        return res.json({ message: "Deleted" });
      }
    });
    throw new BadRequestError(`${itemName} not found`)

  } catch (error) {
    return next(error);
  }
});

module.exports = router;