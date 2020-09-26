/*
Defines all document schemas used in MongoDB database. 
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		totalTime: {
			type: Number,
			default: 0,
		},
		level: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const subjectSchema = new Schema(
	{
		// add fields here
		subjectName: String,
		topics: [{
				topicName: String,
				urls: [String]
				}]
	},
	{
		timestamps: true,
	}
);

// Create a new subject in the database
function createNewSubject(){
	Subject.insertMany([
		{
		 subjectName: "Math",
		 topics: [{topicName: "Calculus", urls: "https://www.google.com/"}]
		}
	], function(err, urlName){});
}

const User = mongoose.model('User', userSchema);
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = {
	mongoose,
	User,
	Subject,
};
