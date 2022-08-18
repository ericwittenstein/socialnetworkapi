const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

// Schema to create thoughts model
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
      min_length: 1,
			max_length: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
      get: (date) => Date.now,
		},
	},
	{
    toJSON: {
			getters: true,
      virtuals: true,
		},
	}
);

const Student = model("student", studentSchema);

module.exports = Student;
