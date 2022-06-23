const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); // Handle JSON Data
app.use(express.urlencoded({ extended: true })); // Handle URL Encoding

const database = (async () => {
  try {
    const auth = true;
    const name = "tiktok_node";
    const host = "" || "localhost:27017";
    const default_params = "retryWrites=true&w=majority";
    const user = "";
    const password = "";

    let connectionString = `mongodb://${host}/${name}`; // For Local Database

    if (auth) {
      // For Hosted Database
      connectionString = `mongodb+srv://${user}:${password}@${host}/${name}?${default_params}`;
    }
    const connection = await mongoose.connect(connectionString);

    if (connection.connection.readyState === 1)
      console.log("Mongoose connected to database");
  } catch (error) {
    console.log(error.message);
  }
})();

// Base Request to the (API)
app.get("/", (req, res) => {
  res.status(200).send({
    data: { value: "Nothing Amazing" },
    message: "You've Successfully reached our API",
  });
});

app.post("/try", async (req, res) => {
  console.log({ message: "Logging a request" });
  res.status(200).json({ success: true });
});

// Setting the app to listen to a port
app.listen(port, () => console.log(`App listening to port ${port}`));

// That's all for a basic nodejs & Mongodb app
