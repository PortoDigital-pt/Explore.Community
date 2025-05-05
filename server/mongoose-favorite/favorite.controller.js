/* eslint-disable import/no-named-as-default-member */
const service = require('./favorite.service');

const logger = console;

const save = async (req, res) => {
  try {
    const favoritesToUpdate = req.body?.map(favorite => {
      // todo - remove FAKE_USER and get the info from header
      return {
        updateOne: {
          filter: { favouriteId: favorite.favouriteId },
          update: { ...favorite, userId: process.env.FAKE_USER },
          upsert: true
        }
      };
    });

    await service.save(favoritesToUpdate);
    logger.log('resultBulk Ok => ');
    res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};

const findAll = async (req, res) => {
  logger.log('\ncontroller::findAll\n', service);
  try {
    // todo - remove FAKE_USER and get the info from header
    const ret = await service.findAll(process.env.FAKE_USER);
    res.status(200).json(ret);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  try {
    logger.log('\ncontroller::remove::req.body -', req.body);
    const favouriteId = Array.isArray(req.body) ? req.body[0] : null;

    if (!favouriteId) {
      return res.sendStatus(404);
    }

    // todo - remove FAKE_USER and get the info from header
    const isOwner = await service.isOwner(process.env.FAKE_USER, favouriteId);

    if (!isOwner) {
      return res.sendStatus(403);
    }

    // todo - remove FAKE_USER and get the info from header
    await service.remove(favouriteId);
    res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};

export { save, findAll, remove };
