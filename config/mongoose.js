require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
    `mongodb://localhost/${process.env.DATABASE_NAME}`,
    () => console.log('database connected successfuly'),
    (e) => console.log(e.message)
);

module.exports = mongoose;