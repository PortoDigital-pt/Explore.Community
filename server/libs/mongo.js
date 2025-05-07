const mongoose = require('mongoose');

const logger = console;
class MongoDataBase {
  constructor() {
    this.mongoConnection = null;

    this.CONNECTION_OPTIONS = {
      // useCreateIndex: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // is the number of milliseconds to wait before initiating keepAlive on the socket
      keepAliveInitialDelay: 300000,
      maxPoolSize: 20, // Maintain up to 10 socket connections
      connectTimeoutMS: 60000, // Give up initial connection after 60 seconds
      socketTimeoutMS: 60000 // Close sockets after 60 seconds of inactivity
    };
  }

  async connect() {
    let status = true;
    logger.info(` ==Mongoose - Connecting - [${process.env.MONGO_URI}]`);
    try {
      const url = process.env.MONGO_URI;

      this.mongoConnection = await mongoose.connect(
        url,
        this.CONNECTION_OPTIONS
      );
    } catch (error) {
      status = false;
      logger.error('==Mongoose Exception ', error.message);
    }
    return status;
  }

  async close() {
    try {
      await this.mongoConnection.disconnect();
      logger.info(' ==Mongoose successfully disconnected.');
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  getConnection() {
    logger.log('getConnection ');
    return this.mongoConnection;
  }
}

mongoose.connection.on('connected', () => {
  logger.info(' \n==Mongoose - connection stablished. \n');
});

mongoose.connection.on('error', err => {
  logger.info(err);
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', () => {
  logger.info(' \n ==MONGOOSE - connection disconnected.\n');
});

const mongo = new MongoDataBase();

module.exports = {
  mongo
};
