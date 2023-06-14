const express = require("express");

const { parseUserInput } = require("./utils/controller");
const { sendResponse } = require("./utils/twilio");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { Body } = req.body;

  const response = await parseUserInput(Body);
  const message = sendResponse(response);

  res.send(message);
});

// start the server on PORT 5000
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
