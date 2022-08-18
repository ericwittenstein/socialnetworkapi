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
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
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

// virtual friendcount
userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
