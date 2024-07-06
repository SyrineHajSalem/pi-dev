const express = require("express");
const app = express();
const cors = require('cors');
// const PORT = 3000;
const vehiculeRouter = require("./routes/vehicule");
const reservationRouter = require("./routes/reservation");
const paymentRouter = require("./routes/payment");

const http = require("http");
const path = require("path");
const createError = require("http-errors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserRoute = require("./routess/User");
const GouvernementRoute = require("./routess/gouvernement.js");
const VilleRoute = require("./routess/ville.js");
const Point_urban_moveRoute = require("./routess/point_urban_move.js");
const AbonnementRoute = require("./routess/abonnement.js");
const feedbackRoutes = require("./routess/feedback.js");
const fs = require("fs");

// Import routes


mongoose.set("strictQuery", true);

// Connect to MongoDB database
mongoose
  .connect("mongodb://127.0.0.1:27017/UrbanMove", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the DB!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// View engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:4200"],

    credentials: true, 

    methods: "POST,GET,PUT,OPTIONS,DELETE,PATCH", 
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", UserRoute);
app.use("/gouvernement", GouvernementRoute);
app.use("/ville", VilleRoute);
app.use("/point_urban_move", Point_urban_moveRoute);
app.use("/abonnement", AbonnementRoute);
app.use("/feedback", feedbackRoutes);
// Route handlers
app.use("/reservations", reservationRouter);
app.use("/vehicules", vehiculeRouter);
app.use("/payments", paymentRouter);
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

const server = http.createServer(app);
server.listen(5000, () => {
  console.log("App is running on port 5000");
});
