const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const passport = require("passport")
const session = require("express-session");

// Table Database
const category = require("./routes/category");
const client = require("./routes/client");
const employee = require("./routes/employee");
const invoice_buy = require("./routes/invoice_buy");
const invoice_sell = require("./routes/invoice_sell");
const money = require("./routes/money");
const permissions = require("./routes/permissions");
const product_buy = require("./routes/product_buy");
const product_sell = require("./routes/product_sell");
const products = require("./routes/products");
const services_sell = require("./routes/services_sell");
const services = require("./routes/services");
const setting = require("./routes/setting");
const supplier = require("./routes/supplier");
const users = require("./routes/users");
const login = require("./routes/login");

const app = express();

//setting
app.set('port', process.env.PORT || 3000);
require("./lib/passport");

//midlewares
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    /* cookie: {domain: 'localhost:3000'} */
  })
);
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(category);
app.use(client);
app.use(employee);
app.use(invoice_buy);
app.use(invoice_sell);
app.use(money);
app.use(permissions);
app.use(product_buy);
app.use(product_sell);
app.use(products);
app.use(services_sell);
app.use(services);
app.use(setting);
app.use(supplier);
app.use(users);
app.use(login);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
