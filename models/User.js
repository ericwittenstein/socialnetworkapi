const { Schema, model } = require("mongoose");
// import validator npm and email checker method
const { isEmail } = require("validator");

// Schema to create a user model
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: [isEmail, "Please enter a valid email address"],
		},
		// ref to thoughts the user has created
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		// ref to friends the user has
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// virtual friendcount for length of friends array
userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
