import { Favorite } from './model';

const logger = console;

const save = async favoritesToUpdate => {
  const resultBulk = await Favorite.bulkWrite(favoritesToUpdate);
  return resultBulk;
};

const findAll = async userId => {
  const query = Favorite.find();
  query.where({ userId });
  query.sort({});
  const ret = await query.exec();
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
    return doc?.userId === userId;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export { save, findAll, remove, isOwner };
