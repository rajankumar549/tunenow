let mongoose = require('mongoose');
const util = require('util');

exports.connect = function (config) {
    let dbUrl = util.format('mongodb+srv://%s:%s@%s/%s?authSource=%s', config.user, config.password, config.host, config.db, config.authSource);
    try {
        mongoose.connect(dbUrl, {useNewUrlParser: true});
        console.log('Mongo DB Connected SuccessFull!')
    } catch (err) {
        console.log(err)
        console.log('Mongo DB Connection Failed')
    }
    return mongoose;
};
