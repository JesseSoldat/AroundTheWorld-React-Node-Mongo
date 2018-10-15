require("./server/config/config");

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectToDb = require("./server/db/mongoose");

const app = express();

connectToDb();

app.listen(process.env.PORT);

app.use(helmet());
app.use(bodyParser.json());

require("./server/routes/auth")(app);
