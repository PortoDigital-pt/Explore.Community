/* eslint-disable no-console */
import { validationResult } from 'express-validator';
import { errorHandler } from '../../passport-openid-connect/utils';
import * as service from './service';

export const save = async (req, res) => {
  try {
    const loggedUserId = req.user?.data?.sub;
    const favoritesToUpdate = [];

    req.body?.forEach(favorite => {
      if (!favorite.userId || favorite.userId === loggedUserId) {
        favoritesToUpdate.push({
          updateOne: {
            filter: {
              favouriteId: favorite.favouriteId,
              userId: loggedUserId
            },
            update: { ...favorite, userId: loggedUserId },
            upsert: true
          }
        });
      }
    });

    await service.save(favoritesToUpdate);
    const favorites = await service.findAll(req.user?.data?.sub);
    res.status(200).json(favorites);
  } catch (err) {
    console.error(err);
    errorHandler(res, err);
  }
};

export const findAll = async (req, res) => {
  try {
    const ret = await service.findAll(req.user?.data?.sub);
    res.status(200).json(ret);
  } catch (err) {
    console.error(err);
    errorHandler(res, err);
  }
};

export const remove = async (req, res) => {
  try {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      return res.sendStatus(404);
    }

    const favouriteId = Array.isArray(req.body) ? req.body[0] : null;

    const isOwner = await service.isOwner(req.user?.data?.sub, favouriteId);

    if (!isOwner) {
      return res.sendStatus(403);
    }

    await service.remove(favouriteId);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    errorHandler(res, err);
  }
};
