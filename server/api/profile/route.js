import express from 'express';
import { userAuthenticated } from '../../passport-openid-connect/utils';
import { removeUserAccount } from './controller';

const router = express.Router();
const PATH = '/api/user/profile';

router.delete(PATH, [userAuthenticated], removeUserAccount);

export default router;
