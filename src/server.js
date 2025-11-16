require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDatabase = require('./config/database');

const requestTypesRouter = require('./routes/requestTypes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/request-types', requestTypesRouter);

if (require.main === module) {
  connectDatabase();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

module.exports = app;
