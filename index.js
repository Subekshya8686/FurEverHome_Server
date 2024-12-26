const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./route/userRoute");
const petRoute = require("./route/petRoute");
const formRoute = require("./route/formRoute");
const adoptionRoute = require("./route/adoptionRoute");

const app = express();

connectDB();
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/pet", petRoute);
app.use("/api", formRoute);
app.use("/api", adoptionRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/data", (req, res) => {
  res.send("Data has been added!");
  console.log(req.body);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
