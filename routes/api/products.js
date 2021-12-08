const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Product = require("../../models/Product");
router.post("/insert", (req, res) => {
    const newProduct = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });
    newProduct
        .save()
        .then(product => res.json(product))
        .catch(err => console.log(err));
});
router.get("/list", function (req, res) {
    Product.find({}, function (err, Product) {
        if (err) console.log(err)
        res.json(Product)
    })
});
router.post("/update", function (req, res) {
    var id = req.body.id;
    var prod_name = req.body.name;
    var price = req.body.price;
    var quantity = req.body.quantity;
    Product.findOneAndUpdate({
        id: id
    }, {
        $set: {
            prod_name: prod_name,
            price: price,
            quantity: quantity
        }
    }, function (err, result) {
        if (err) console.log(err)
        if (result) {
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }

    })
});
router.delete("/delete", function (req, res) {
    var id = req.body.id;
    Product.findByIdAndDelete({
        _id: id
    }, function (err, result) {
        if (err) console.log(err)
        if (result != null) {
            res.json({
                success: true
            })
        }
    })
})

module.exports = router;