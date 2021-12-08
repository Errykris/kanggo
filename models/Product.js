const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
id: { type: String, required: true },
name: { type: String, required: true },
price: { type: String, required: true },
quantity: { type: String, required:true }
});
module.exports = Product = mongoose.model("products", ProductSchema);