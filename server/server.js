const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectToDB = require('./config/db');

connectToDB();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
