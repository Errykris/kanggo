const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrdersSchema = new Schema({
order_id: { type: String, required: true },
user_id: { type: String, required: true },
product_id: { type: String, required: true },
amount: { type: String, required:true },
status: { type: String, required:true }
});
module.exports = Orders = mongoose.model("Orders", OrdersSchema);