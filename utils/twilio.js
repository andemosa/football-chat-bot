const MessagingResponse = require("twilio").twiml.MessagingResponse;

const sendResponse = (message) => {
  const twiml = new MessagingResponse();
  twiml.message(message);
  return twiml.toString();
};

module.exports = { sendResponse };