const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || process.env.MONGO_URI;


const connectToDB = async () => {
  let dbConnection;
  try {
    dbConnection = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Mongo DB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  return dbConnection;
};

module.exports = connectToDB;
