const Thought = require("../../models/Thought");
const User = require("../../models/User");
const { responder } = require("../../Utils");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});

      responder(200, thoughts, res);
    } catch (err) {
      console.log(err);
      responder(200, { error: err.message }, res);
    }
    return;
  },

  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.id,
      });
      if (!thought) {
        responder(
          404,
          {
            message: "Thought not found",
          },
          res
        );
        return;
      }
      responder(200, thought, res);
      res.json(thought);
    } catch (err) {
      console.log(err);
      responder(
        500,
        {
          error: err.message,
        },
        res
      );
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {
          _id: req.body.userId,
          thoughts: { $ne: newThought._id },
        },
        { $push: { thoughts: newThought._id } },
        {
          new: true,
          unique: true,
        }
      );
      responder(
        200,
        { message: "Thought successfully created", newThought },
        res
      );
    } catch (err) {
      console.log(err);
      responder(200, { error: err.message }, res);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        {
          new: true,
        }
      );
      if (!thought) {
        responder(
          404,
          {
            message: "Thought not found.",
          },
          res
        );
        return;
      }
      responder(200, thought, res);
    } catch (err) {
      console.log(err);
      responder(200, { error: err.message }, res);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        responder(
          404,
          {
            message: "Thought not found.",
          },
          res
        );
        return;
      }
      const user = await User.findOneAndUpdate(
        {
          thoughts: { $eq: req.params.id },
        },
        { $pull: { thoughts: req.params.id } },
        {}
      );
      responder(200, thought, res);
    } catch (err) {
      console.log(err);
      responder(500, { error: err.message }, res);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      if (!thought) {
        responder(
          404,
          {
            message: "Thought not found.",
          },
          res
        );
      }
      thought.reactions.push(req.body);
      responder(200, thought, res);
    } catch (err) {
      console.log(err);
      responder(500, { error: err.message }, res);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.id,
      });
      if (!thought) {
        responder(
          404,
          {
            message: "Thought not found.",
          },
          res
        );
      }
      thought.reactions.id(req.body.reactionId).remove();
      responder(200, thought, res);
    } catch (err) {
      console.log(err);
      responder(500, { error: err.message }, res);
    }
  },
};

module.exports = thoughtController;
