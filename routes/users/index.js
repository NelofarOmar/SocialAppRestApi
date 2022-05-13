const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  deleteFriendFromUser,
} = require("../../controllers/user");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router
  .route("/:id/friends/:friendId")
  .post(addFriendToUser)
  .delete(deleteFriendFromUser);

module.exports = router;
