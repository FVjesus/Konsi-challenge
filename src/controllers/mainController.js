const crawler = require('../utils/crawler');

module.exports = () => {

  const controller = {}

  controller.post = async (req, res) => {
    var document = req.body.document;
    var user = req.body.user;
    var password = req.body.password;

    var text = await crawler(document, user, password);

    res.status(200).json({ 'beneficios': text })
  }

  return controller
}