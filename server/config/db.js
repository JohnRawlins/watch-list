const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  let connection;
  try {
    connection = await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Mongo DB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  return connection;
};

module.exports = connectDB;
