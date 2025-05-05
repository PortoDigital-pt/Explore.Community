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

const findAll = async userId => {
  const query = Favorite.find();
  query.where({ userId });
  query.sort({});
  const ret = await query.exec();
  logger.log('findAll => ', ret);
  return ret;
};

const remove = async favouriteId => {
  const ret = await Favorite.deleteOne({ favouriteId });
  logger.log('service.remove::ret => ', ret);

  if (!ret?.deletedCount) {
    throw new Error('Favorite not found');
  }

  return ret;
};

const isOwner = async (userId, favouriteId) => {
  try {
    const doc = await Favorite.findOne({ favouriteId });
    logger.log('isOwner => ', doc);
    return doc?.userId === userId;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export { save, findAll, remove, isOwner };
