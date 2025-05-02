import { Favorite } from './models/favorite.model';

const logger = console;

const save = async favoritesToUpdate => {
  try {
    const resultBulk = await Favorite.bulkWrite(favoritesToUpdate);
    logger.log('resultBulk => ', resultBulk);

    return resultBulk;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const findAll = async (userId = '') => {
  const query = Favorite.find();
  query.where({}); // todo - { userId: userId };
  query.sort({});
  const ret = await query.exec();
  logger.log('findAll => ', ret);
  return ret;
};

export { save, findAll };
