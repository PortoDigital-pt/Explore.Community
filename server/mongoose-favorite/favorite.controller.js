/* eslint-disable import/no-named-as-default-member */
const service = require('./favorite.service');

const logger = console;

const save = async (req, res) => {
  try {
    const favoritesToUpdate = req.body?.map(favorite => {
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
    const ret = await service.findAll();
    res.status(200).json(ret);
  } catch (err) {
    logger.error(err);
    res.sendStatus(500);
  }
};

export { save, findAll };
