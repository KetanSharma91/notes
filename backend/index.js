const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectToMongo();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the Express server
app.listen(port, () => {
  console.log(`iNoteBook backend listening on port http://localhost:${port}`);
});
