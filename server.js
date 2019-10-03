const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const connectToDB = require('./config/db');
require('dotenv-extended').load();

connectToDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/videos', require('./routes/videos'));

app.use('/api/reviews', require('./routes/reviews'));

app.use('/api/search', require('./routes/search'));

app.use('/api/video-profile', require('./routes/video-profile'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
