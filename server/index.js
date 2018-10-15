require("./config/config");

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectToDb = require("./db/mongoose");

const app = express();

connectToDb();

app.listen(process.env.PORT);

app.use(helmet());
app.use(bodyParser.json());

require("./routes/auth")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets (main.js or main.css)
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

  //express will serve up index.html if it doesn't recognize the route
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
} else {
  app.get("*", (req, res) => {
    res.send(`A request was made to ${req.url}`);
  });
}
