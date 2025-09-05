const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/generate', generateRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
