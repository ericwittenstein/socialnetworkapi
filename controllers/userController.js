const User = require("../models/User");

const errorText = "no user, id just wind over ocean";

module.exports = {
	// get all users
	getUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	// get one user
	getOneUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.populate({ path: "friends", select: "-__v" })
			.populate({ path: "thoughts", select: "-__v" })
			.then((user) =>
				!user
					? res.status(404).json({
							message: errorText,
					  })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// create a new user
	createUser(req, res) {
		User.create(req.body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(500).json(err));
	},
	// update user
	updateUser(req, res) {
		User.updateOne({ _id: req.params.userId }, req.body)
			.then((user) =>
				!user
					? res.status(404).json({
							message: errorText,
					  })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// delete user
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({
							message: errorText,
					  })
					: Thought.deleteMany({
							_id: { $in: username.thoughts },
					  })
			)
			.catch((err) => res.status(500).json(err));
	},
	// add a friend to the user's list of friends
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $push: { friends: req.params.friendId } }
		)
			.then((user) =>
				!user
					? res
							.status(404)
							.json({
								message: errorText,
							})
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	// delete a friend from the list of friends
	deleteFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: errorText })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};
