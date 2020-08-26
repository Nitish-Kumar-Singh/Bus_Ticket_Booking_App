const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('database connected');
  } catch (err) {
    console.error(err.message);
    //Exit Process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
