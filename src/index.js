const express = require("express");
const morgan = require("morgan")
const cors = require("cors")
const app = express();

//Consts
const settingCors = {
  origin: "http://localhost:4000",
  // origin: "http://192.168.1.24:4000",
  credentials: true
}

//setting
app.set('port', process.env.PORT || 3000);

//midlewares
app.use(morgan("dev"));
app.use(cors(settingCors));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use(require('./routes'))

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
