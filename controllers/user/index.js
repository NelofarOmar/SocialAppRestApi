const User = require("../../models/User");
const { responder } = require("../../Utils");
const user = {
  async getAllUsers(req, res) {
    // try {
    //   const users = await User.find({});
    //   res.json(users);
    // } catch (err) {
    //   console.log(err);
    //   res.status(400).json(err);
    // }
    try {
      const users = await User.find({}).then(
        (data) => {
          return data;
        },
        (error) => {
          throw new Error(error);
        }
      );
      responder(200, users, res);
    } catch (error) {
      responder(200, "", res);
    }
  },

  async getUser(req, res) {
    console.log(req.params);
    try {
      const user = await User.findOne({
        $or: [
          { _id: req.params.id },
          { username: req.params.id },
          { email: req.params.id },
        ],
      });

      if (!user) {
        responder(404, { message: "User not found" }, res);
      }
      responder(200, user, res);
    } catch (error) {
      responder(500, { error: error.message }, res);
    }
    res.end();
  },

  async createUser(req, res) {
    try {
      console.log(req.body);
      const newUser = await User.create(req.body);
      responder(200, newUser, res);
    } catch (err) {
      console.log(err);
      responder(500, { error: err.message }, res);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {
          $or: [
            { _id: req.params.id },
            { username: req.params.id },
            { email: req.params.id },
          ],
        },
        req.body,
        {
          new: true,
        }
      );
      if (!user) {
        responder(
          404,
          {
            message: "User not found.",
          },
          res
        );
      }
      user.save();

      responder(200, user, res);
    } catch (error) {
      responder(500, { error: err.message }, res);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        $or: [
          { _id: req.params.id },
          { username: req.params.id },
          { email: req.params.id },
        ],
      });

      if (!user) {
        responder(
          404,
          {
            message: "User not found.",
          },
          res
        );
        return;
      }

      const id = user._id;

      const users = await User.find({});

      users.forEach((element) => {
        User.findOneAndUpdate(element, { $pull: { friends: id } });
        // await User.findByIdAndUpdate(element._id,{$pull: { 'usersLike': "1" }});
        // element.friends;
      });

      responder(200, { message: "user deleted successfully ", user }, res);
    } catch (error) {
      responder(500, { error: error.message }, res);
    }
  },

  async addFriendToUser(req, res) {
    try {
      const me = await User.findById(req.params.id);
      const fr = await User.findById(req.params.friendId);

      if (me == null || fr == null) {
        responder(500, { error: "Users not found" }, res);
        return;
      }

      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
          friends: { $ne: req.params.friendId },
        },
        { $push: { friends: req.params.friendId } },
        {
          new: true,
          unique: true,
        }
      );
      if (user == null) {
        responder(500, { message: "User already a friend" }, res);
        return;
      }
      responder(200, { message: "Friend added to user" }, res);
    } catch (err) {
      responder(500, { error: err.message }, res);
    }
  },

  async deleteFriendFromUser(req, res) {
    try {
      const me = await User.findById(req.params.id);
      const fr = await User.findById(req.params.friendId);

      if (me == null || fr == null) {
        responder(500, { error: "Users not found" }, res);
        return;
      }
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $pull: { friends: req.params.friendId } },
        {
          new: true,
        }
      );
      if (user == null) {
        responder(200, { message: "Friend not found in user." }, res);
        return;
      }

      responder(200, { message: "Friend removed from user" }, res);
    } catch (err) {
      console.log(err);
      responder(200, { error: err.message }, res);
    }
  },
};

module.exports = user;
