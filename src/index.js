const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const passport = require("passport")
const session = require("express-session");
const app = express();

//setting
app.set('port', process.env.PORT || 3000);
require("./lib/passport");

//midlewares
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true
  })
);
app.use(morgan("dev"));
app.use(cors({ origin: "http://192.168.1.24:4000" || "http://localhost:4000", credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(require('./routes'))

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
