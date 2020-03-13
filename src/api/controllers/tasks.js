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
const getTasks = catchControllerError('Get Task', async (req, res, next) => {
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

    const { log } = res.locals;

    const task = await TaskService.createTask(requestData, log);

    log.debug(
      'CreateTask service executed without error, sending back a success response.'
    );
    res.status(200).json({ success: true, data: task });
  }
);

export default { getTasks, createTask };
