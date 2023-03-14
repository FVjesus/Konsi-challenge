const bodyParser = require('body-parser');
const express = require('express');

module.exports = () => {
  const itensRouter = express.Router();
  const mainController = require('../controllers/mainController')();

  itensRouter.post("/", mainController.post);

  return itensRouter;
}; 