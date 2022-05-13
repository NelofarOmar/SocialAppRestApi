const express = require("express");
const router = express.Router();

const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thought");

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

router.route("/:id/reactions").post(createReaction).delete(deleteReaction);

module.exports = router;
