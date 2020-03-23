import Task from '../models/Task';
import advancedResults from './helpers/advancedResults';
import ServiceError from './helpers/ServiceError';
import { loadOptions } from '@babel/core';

/**
 * @desc Service to get all tasks from the database.
 * @param {object} req Request object from controller.
 * @param {function} log Logger utility for logging messages.
 * @returns {object} Returns pagination and results.
 * @throws {Error} Any error that prevents the service from executing.
 */
const getTasks = async (req, log) => {
  log.debug('Getting tasks from database.');
  return advancedResults(req, Task, 'user');
};

/**
 * @desc Service to create a new task.
 * @param {object} data Task data from controller.
 * @param {function} log Logger utility for logging messages.
 * @returns {object} The new task.
 * @throws {Error} Any error that prevents the service from executing.
 */
const createTask = async (data, log) => {
  const { title, description, user } = data;

  log.debug('Checking if task exists in the database.');
  const existingTask = await Task.findOne({ title });

  if (existingTask) {
    log.debug('Task with this title already exist. Throwing error.');
    throw new ServiceError('Task with this title already exist.', 400);
  }

  log.debug('Saving task to database.');
  const task = await Task.create({
    title,
    description,
    user: user.id
  });

  return task;
};

/**
 * @desc Service update a task.
 * @param {object} data Task data from controller.
 * @param {function} log Logger utility for logging messages.
 * @returns {object} The updated task.
 * @throws {Error} Any error that prevents the service from executing.
 */
const updateTask = async (data, slug, log) => {
  let task = await Task.findOne({ slug });

  log.debug('Checking if task exists.');
  if (!task) {
    log.debug('Task with this slug does not exist. Throwing error.');
    throw new ServiceError('Task does not exist.', 400);
  }

  log.debug('Check if user created this task.');
  if (task.user.toString() !== data.user.id) {
    log.debug('User is not authorized to update this course. Throwing error.');
    throw new ServiceError(
      'User is not authorized to update this course.',
      400
    );
  }

  log.debug('Updating task.');
  task = Object.assign(task, data);
  task = task.save();

  return task;
};

export default {
  getTasks,
  createTask,
  updateTask
};
