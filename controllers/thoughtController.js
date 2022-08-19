const { Thought, User } = require("../models");

module.exports = {
	getThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},
	getOneThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.populate({ path: "reactions", select: "-__v" })
			.then((thought) =>
				!thought
					? res.status(404).json({
							message:
								"no thoughts, head empty, id just wind over ocean",
					  })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	// create a new thought
	createThought(req, res) {
		Thought.create(req.body)
			.then((thoughtDB) => res.json(thoughtDB))
			.catch((err) => res.status(500).json(err));
	},
	// update a thought
	updateThought(req, res) {
		Thought.updateOne({ _id: req.params.thoughtId }, req.body)
			.then((thought) =>
				!thought
					? res.status(404).json({
							message:
								"no thoughts, head empty, id just wind over ocean",
					  })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	deleteThought(req, res) {
		Thought.deleteOne({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({
							message:
								"no thoughts, head empty, id just wind over ocean",
					  })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	createReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({
							message:
								"no thoughts, head empty, id just wind over ocean",
					  })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: req.body } }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({
							message:
								"no thoughts, head empty, id just wind over ocean",
					  })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
};
