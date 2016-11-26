const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
mongoose.connect('mongodb://output:output11@ds111188.mlab.com:11188/output');


const userSchema = new Schema({
	firstName:{type: String, required: true},
	lastName: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true },
	songs: [{type: Schema.Types.ObjectId, ref: 'Song'}],
});

const songSchema = new Schema({
  songArtist:{type: String},
  songTitle:{type: String},
  songGenre:{type: String}
});

const User = mongoose.model('User', userSchema);
const Song = mongoose.model('Song', songSchema);

module.exports = {user: User, song: Song};
