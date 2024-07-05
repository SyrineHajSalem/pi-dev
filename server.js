const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const UserRoute = require("./routes/User");
const GouvernementRoute = require("./routes/gouvernement.js");
const VilleRoute = require("./routes/ville.js");
const Point_urban_moveRoute = require("./routes/point_urban_move.js");
const AbonnementRoute = require("./routes/abonnement.js");
const feedbackRoutes = require("./routes/feedback.js");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", UserRoute);
app.use("/gouvernement", GouvernementRoute);
app.use("/ville", VilleRoute);
app.use("/point_urban_move", Point_urban_moveRoute);
app.use("/abonnement", AbonnementRoute);
app.use("/feedback", feedbackRoutes);

app.get("/governorates", (req, res) => {
  const filePath = path.join(__dirname, "governorates.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello !!" });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

//database configuration
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/userBD")
  .then(() => {
    console.log("Databse Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });
