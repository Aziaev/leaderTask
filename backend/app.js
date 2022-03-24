const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 5000);

const MONGO_DB_URI = config.get("mongoDbUri");
const MONGO_DB_CONFIG = config.get("mongoConfig");

app.use(express.json({ extended: true }));

app.use("/api/products", require("./routes/products"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join("client", "build")));
}

app.get("/*", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "..", "client", "build", "index.html")
  );
});

async function start() {
  try {
    console.log("Starting app");
    await mongoose.connect(MONGO_DB_URI, MONGO_DB_CONFIG);

    app.listen(app.get("port"), () => {
      console.log(`Success! App is running on port ${app.get("port")}`);
    });
  } catch (e) {
    console.error("Server error", e.message);
    process.exit(1);
  }
}

start();
