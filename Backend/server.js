const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dBConn");
// const { logger } = require("./middleware/logEvents");
// const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

connectDB();

// //custom middleware logger
// app.use(logger);
app.use(credentials);
//Cross Origin Resource sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for JSON
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
//serve static files
app.use("/", express.static(path.join(__dirname, "public")));

//routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use(verifyJWT);


mongoose.connection.once("open", () => {
  console.log("Connected To MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
