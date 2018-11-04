/**
 * API to register an user.
 *
 * @author Gustavo Nunes gnunes.moura[at]gmail.com
 */

const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).send('');
});

module.exports = router;
