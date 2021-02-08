// Require all of the files we need
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
// uri comes from the MongoDB Atlas, DB is stored there
// useNewUrlParser and useCreateIndex are here because something was depricated before as well as useUnifiedTopology
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const patientsRouter = require('./routes/patients')
// const staffRouter = "/routes/staff";
// const notesRouter = "/routes/notes";

app.use("/patients", patientsRouter);
// app.use("/staff", staffRouter);
// app.use("/notes", notesRouter);

// Starts Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});