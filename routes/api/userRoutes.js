const router = require("express").Router();
const {
	getUsers,
	getOneUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:thoughtId
router.route("/:userId/friends/:thoughtId").post(addFriend).delete(deleteFriend);

module.exports = router;
