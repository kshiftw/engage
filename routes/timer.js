const { User } = require('../src/database');
module.exports = (router) => {
	router.post('/update_timer', async (req, res) => {
		const { username, time_elapsed } = req.body;

		let totalTime;

		// Create a new user in the database with given username, email, passwordHash
		const user = await User.findOne({ username: username }, 'totalTime level')
			.lean()
			.exec(async function (err, user) {
				if (err) {
					console.log('Error finding user');
					console.log(err);
				} else {
					totalTime = Number(user.totalTime) + Number(time_elapsed);

					await User.findOneAndUpdate(
						{ username: username },
						{
							$set: {
								totalTime: totalTime,
							},
						}
					).exec(function (err, result) {
						if (err) {
							console.log('Error updating user stats');
							console.log(err);
						} else {
							console.log('Successfully updated user stats');
						}
					});
				}
			});
	});
};
