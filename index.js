const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const orders = require("./routes/api/orders");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//SERVER LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runing on PORT: ${PORT}`));

//IMPORT KEYS CONFIG
const db = require("./config/keys").mongoURI;
//Connect to DB
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport); 
//ROUTE APIs
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/orders", orders);