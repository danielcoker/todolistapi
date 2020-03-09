import User from '../models/User';
import ServiceError from './helpers/ServiceError';

/**
 * @desc Service funciton that creates a new user.
 * @param {object} data User data from controller.
 * @param {function} log Logger utility for logging messages.
 * @returns {object} The new user.
 * @throws {Error} Any error that prevents the service from executing.
 */
const createUser = async (data, log) => {
  log.debug('Executing createUser service.');
  const { name, email, password } = data;

  log.debug('Checking if a user with the given email already exist.');
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    log.debug('User with the given email exists. Throwing error.');
    throw new ServiceError('User with this email already exist.', 400);
  }

  log.debug('Saving user data in database.');
  const user = await User.create({
    name,
    email,
    password
  });

  return formatUserData(user);
};

/**
 * @desc Format the user data to be returned to client.
 * @param {object} user The raw user data gotten from the database.
 * @returns {object} The formatted user data.
 */
const formatUserData = user =>
  JSON.parse(
    JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  );

export default {
  createUser
};
