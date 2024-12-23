const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./route/userRoute");
const app = express();

connectDB();
app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/data", (req, res) => {
  res.send("Data has been added!");
  console.log(req.body);
});

const PORT = 5000;
app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
