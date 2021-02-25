// api/db/mongoose.js
const mongoose = require('mongoose');

let MONGO_URI;

if (process.env.NODE_ENV === 'development') {
    const variables = require('../../settings.js');
    MONGO_URI = variables.MONGO_URI;
} else {
    MONGO_URI = process.env.MONGO_URI;
}

mongoose.connect(MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        throw new Error(err)
    });

// const db = mongoose.connection;

// db.on('error', (e) => {
//     // logger.error(e.toString(), true);
//     // logger.error(e.stack, true);
//     throw new Error(e);
//     process.exit(999);
// });

// db.once('open', async function () {
//     console.info('DB Connected Successfully');
// });

module.exports = mongoose;
