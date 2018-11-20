/* eslint no-underscore-dangle: 0 */
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../data-access');
const logger = require('../util/logger');

const { reject } = Promise;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

/**
 * user schema
 * passoword regex is used to ensure the password strength
 *
 * @author Gustavo Moura gnunes.moura[at]gmail.com
 */
const userSchema = Joi.object().keys({
  username: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9]+$/),
  password: Joi.string().min(8).max(32)
    .regex(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/),
});

/**
 * Function that create a new user in the database.
 *
 * @author Gustavo Moura gnunes.moura[at]gmail.com
 *
 * @param { username: String, passoword: String } newUser User to be saved in the database.
 *
 * @returns { id: String } Saved User.
 */
async function createUser(newUser) {
  const { value, err } = Joi.validate(newUser, userSchema);

  if (err) {
    return reject(err);
  }

  const user = new User({
    ...value,
    password: await bcrypt.hash(value.password, SALT_ROUNDS),
  });

  return user.save()
    .then(() => ({ id: user._id }))
    .tap(({ id }) => logger.info(`new user created with _id: ${id}`))
    .catch((error) => {
      logger.error('createUser - Err');
      logger.error(error);
      throw new Error('user can\'t be saved');
    });
}

/**
 * Function that find an user in the database.
 *
 * @author Gustavo Moura gnunes.moura[at]gmail.com
 *
 * @param { username: String, passoword: String } newUser User to be found in the database.
 *
 * @returns Found User or null.
 */
async function findUser(user) {
  const { value, err } = Joi.validate(user, userSchema);

  if (err) {
    return reject(err);
  }

  return User
    .findOne({
      ...user,
      password: await bcrypt.hash(value.password, SALT_ROUNDS),
    })
    .lean()
    .then(saved => saved)
    .catch((error) => {
      logger.error('findUser - Err');
      logger.error(error);
      return null;
    });
}

module.exports = {
  createUser,
  findUser,
};
