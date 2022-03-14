const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { settingCors } = require("./config");
const app = express();

//setting
app.set("port", process.env.PORT || 3000);

//midlewares
app.use(morgan("dev"));
app.use(cors(settingCors));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use(require("./routes"));

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
