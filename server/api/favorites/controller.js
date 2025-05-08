/* eslint-disable no-console */
import { validationResult } from 'express-validator';
import { errorHandler } from '../../passport-openid-connect/utils';
import * as service from './service';

export const save = async (req, res) => {
  try {
    const favoritesToUpdate = [];
    req.body?.forEach(favorite => {
      if (!favorite.userId || favorite.userId === process.env.FAKE_USER) {
        favoritesToUpdate.push({
          updateOne: {
            filter: {
              favouriteId: favorite.favouriteId,
              userId: process.env.FAKE_USER
            },
            update: { ...favorite, userId: process.env.FAKE_USER },
            upsert: true
          }
        });
      }
    });

    await service.save(favoritesToUpdate);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    errorHandler(res, err);
  }
};

export const findAll = async (req, res) => {
  try {
    // todo - remove FAKE_USER and get the info from header
    const ret = await service.findAll(process.env.FAKE_USER);
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

    // todo - remove FAKE_USER and get the info from header
    const isOwner = await service.isOwner(process.env.FAKE_USER, favouriteId);

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
