import Task from '../models/Task';
import catchControllerError from './helpers/catchControllerError';
import invalidRequest from './helpers/invalidRequest';
import validate from '../validations/validate';
import TaskService from '../services/TaskService';
import * as schemas from '../validations/schemas/tasks';

/**
 * @desc Get all tasks.
 * @access Public
 */
const getTasks = catchControllerError('Get Tasks', async (req, res, next) => {
  const { log } = res.locals;

  const { pagination, results } = await TaskService.getTasks(req, log);

  res.status(200).json({
    success: true,
    count: results.length,
    pagination,
    data: results
  });
});

/**
 * @desc Get one task by slug.
 * @access Public
 */
const getTask = catchControllerError('Get Task', async (req, res, next) => {
  const { log } = res.locals;

  const slug = req.params.slug;

  const task = await TaskService.getTask(slug, log);

  res.status(200).json({
    success: true,
    data: task
  });
});

/**
 * @desc Create new task.
 * @access Private
 */
const createTask = catchControllerError(
  'Create Task',
  async (req, res, next) => {
    const requestData = validate(schemas.createTask, req.body);
    if (requestData.error) {
      return invalidRequest(res, { errors: requestData.error });
    }

    requestData.user = req.user;

    const { log } = res.locals;

    const task = await TaskService.createTask(requestData, log);

    log.debug(
      'CreateTask service executed without error, sending back a success response.'
    );
    res.status(201).json({ success: true, data: task });
  }
);

/**
 * @desc Update task.
 * @access Private
 */
const updateTask = catchControllerError(
  'Update Task',
  async (req, res, next) => {
    const requestData = validate(schemas.createTask, req.body);
    if (requestData.error) {
      return invalidRequest(res, { errors: requestData.error });
    }

    requestData.user = req.user;

    const { log } = res.locals;

    const slug = req.params.slug;

    const task = await TaskService.updateTask(requestData, slug, log);

    log.debug(
      'Update task service executed without error, sending back a success response.'
    );

    res.status(200).json({ success: true, data: task });
  }
);

/**
 * @desc Delete task.
 * @acess Private
 */
const deleteTask = catchControllerError(
  'Delete Task',
  async (req, res, next) => {
    const { log } = res.locals;

    const slug = req.params.slug;

    const deletedTask = await TaskService.deleteTask(slug, req.user, log);

    log.debug(
      'Delete task service executed without error, sending back success response.'
    );

    res.status(200).json({ success: true, data: {} });
  }
);

export default { getTasks, getTask, createTask, updateTask, deleteTask };
