/* eslint-disable no-console */
import { errorHandler } from '../../passport-openid-connect/utils';
import { removeAllByUserId } from '../favorites/service';
import { removeAccountFromProvider } from '../provider-api';

export const removeUserAccount = async (req, res) => {
  try {
    const userId = req.user?.data?.sub;

    await removeAllByUserId(userId);

    await removeAccountFromProvider(userId);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    errorHandler(res, err);
  }
};
