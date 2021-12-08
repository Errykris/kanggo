const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const axios = require('axios').default;

const Order = require("../../models/Order");

router.post("/new", (req, res) => {
    const newOrder = new Order({
        order_id: req.body.order_id,
        user_id: req.body.user_id,
        product_id: req.body.product_id,
        amount: req.body.amount,
        status: "pending"
    });
    newOrder
        .save()
        .then(order => res.json(order))
        .catch(err => console.log(err));
});
router.get("/list", function (req, res) {
    Order.find({}, function (err, Order) {
        if (err) console.log(err)
        res.json(Order)
    })
});
router.post("/payment", function (req, res) {
    axios.get('http://localhost:5000/api/users/current', { headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWVlMmI2MjY4OWI2ZDEyODk0ZTMyMCIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjM4OTQxNDA3LCJleHAiOjE2Mzg5NDUwMDd9.BmCh6GSpxpc_c9hDvy72YF1zMcBrgBSnp8SzySKaQxw' }})
    .then(function (response) {
        // handle success
        // console.log(response);
        var order_id = req.body.order_id;
        var amount = req.body.amount;
        let status = "paid";
        let user_id = response.data.id
        // console.log()
        Order.findOneAndUpdate({
            order_id: order_id
        }, {
            $set: {
                status: "paid",
                amount: amount,
                user_id: user_id
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
    })
    .catch(function (error) {
        // handle error
        // console.log(error);
    })
});
module.exports = router;