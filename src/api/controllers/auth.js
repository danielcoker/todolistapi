import User from '../models/User';
import catchControllerError from './helpers/catchControllerError';
import invalidRequest from './helpers/invalidRequest';
import validate from '../validations/validate';
import * as schemas from '../validations/schemas/user';

const register = catchControllerError('Register', async (req, res, next) => {
  const requestData = validate(schemas.createUser, req.body);
  if (requestData.error) {
    return invalidRequest(res, { errors: requestData.error });
  }

  const { log } = res.locals;

  log.debug('Creating new user.');
  // log.debug(req.body);
  const user = await User.create(req.body);

  res.status(200).json({ success: true, data: user });
});

export default {
  register
};
