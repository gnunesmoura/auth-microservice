const { Router } = require('express');
const { createUser } = require('../controllers/users');
const logger = require('../util/logger');

const router = Router();

/**
 * Route used to register a new user.
 *
 * @author Gustavo Nunes gnunes.moura[at]gmail.com
 */
router.post('/users', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).send({ user });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: 'something went wrong' });
  }
});

module.exports = router;
