const mongoose = require('mongoose');

const connectToMongo = async () => {
  const mongoURI = 'mongodb+srv://ketansharmaks911:2vpxOROavesdcGXJ@note.kzhea.mongodb.net/test'; // Use 127.0.0.1 instead of localhost
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

module.exports = connectToMongo;
