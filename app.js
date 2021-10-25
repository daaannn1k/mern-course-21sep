import express from "express";
import config from "config";
import mongoose from "mongoose";
import routes from "./routes/auth.routes.js";
import link from "./routes/link.routes.js";
import redirectRoute from "./routes/redirect.routes.js";
import path from "path";

const app = express();

//fixam ROUTES pentru fiecare pagina
app.use(express.json({ extended: true }));
app.use("/api/auth", routes);
app.use("/api/link", link);
app.use("/t", redirectRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;
const MONGOOSEURL =
  config.get("mongoUri") || "mongodb://localhost:27017/todolistDB";

async function start() {
  try {
    await mongoose.connect(MONGOOSEURL, {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`Server opened on port ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
