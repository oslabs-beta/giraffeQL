// api/db/mongoose.js
const mongoose = require('mongoose');
const { MONGO_URI } = require('../../settings.js');

mongoose.connect(MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on('error', (e) => {
    // logger.error(e.toString(), true);
    // logger.error(e.stack, true);
    throw new Error(e);
    process.exit(999);
});

db.once('open', async function () {
    console.info('DB Connected Successfully');
});

module.exports = mongoose;
