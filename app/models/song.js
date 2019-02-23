const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    artists: String,
    danceability : Number,
    energy: Number,
    key: Number,
    mode: Boolean,
    speechiness : Number,
    acousticness: Number,
    instrumentalness: Number,
    loudness:Number,
    liveness:Number,
    valence : Number,
    tempo : Number,
    duration_ms : Number,
    time_signature: Number,
    rank : Number


}, {collection: 'songs'});

schema.plugin(timestamps);

module.exports = mongoose.model('Song', schema);
