/* eslint-disable no-console */
import { Favorite } from './model';

export const save = async favoritesToUpdate => {
  const resultBulk = await Favorite.bulkWrite(favoritesToUpdate);
  return resultBulk;
};

export const findAll = async userId => {
  const ret = await Favorite.find().where({ userId }).exec();
  return ret;
};

export const remove = async favouriteId => {
  const ret = await Favorite.deleteOne({ favouriteId });

  if (!ret?.deletedCount) {
    throw new Error('Favorite not found');
  }

  return ret;
};

export const removeAllByUserId = async userId => {
  const ret = await Favorite.deleteMany({ userId });
  return ret;
};

export const isOwner = async (userId, favouriteId) => {
  try {
    const doc = await Favorite.findOne({ favouriteId });

    return doc.userId === userId;
  } catch (error) {
    console.error(error);
    return false;
  }
};
