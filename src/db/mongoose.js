const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', () => console.log('DB connection is successful'));
