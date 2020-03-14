import Task from '../models/Task';
import advancedResults from './helpers/advancedResults';
import ServiceError from './helpers/ServiceError';

/**
 * @desc Service to get all tasks from the database.
 * @param {object} req Request object from controller.
 * @param {function} log Logger utility for logging messages.
 * @returns {object} Returns pagination and results.
 * @throws {Error} Any error that prevents the service from executing.
 */
const getTasks = async (req, log) => {
  log.debug('Getting tasks from database.');
  return advancedResults(req, Task);
};

/**
 * @desc Service to create a new task.
 * @param {object} data Task data from controller.
 * @param {function} log Logger utility for logging messages.
 * @returns {object} The new task.
 * @throws {Error} Any error that prevents the service from executing.
 */
const createTask = async (data, log) => {
  const { title, description } = data;

  log.debug('Checking if task exists in the database.');
  const existingTask = await Task.findOne({ title });

  if (existingTask) {
    log.debug('Task with this title already exist. Throwing error.');
    throw new ServiceError('Task with this title already exist.', 400);
  }

  log.debug('Saving task to database.');
  const task = await Task.create({
    title,
    description
  });

  return task;
};

export default {
  getTasks,
  createTask
};