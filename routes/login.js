/**
 * API to make login and recieve an authorization token.
 *
 * @author Gustavo Nunes gnunes.moura[at]gmail.com
 */
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('respond with a resource');
});

module.exports = router;
