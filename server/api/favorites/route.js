import express from 'express';
import { checkSchema } from 'express-validator';
import { userAuthenticated } from '../../passport-openid-connect/utils';
import * as controller from './controller';
import { deleteSchema } from './schema';

const router = express.Router();
const PATH = '/api/user/favourites';

router.put(PATH, [userAuthenticated], controller.save);
router.get(PATH, [userAuthenticated], controller.findAll);
router.delete(
  PATH,
  [userAuthenticated, checkSchema(deleteSchema, ['body'])],
  controller.remove
);

export default router;
