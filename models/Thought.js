const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create thoughts model
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (date) => Date.now,
		},
		// user that created the thought
		username: {
			type: String,
			required: true,
		},
		// nested docs of reactions, work like replies
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// virtual to calculate and return length of reactions array
thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
