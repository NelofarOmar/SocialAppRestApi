const user = {
  async getAllUsers(req, res) {
    res.send("Get all Users");
  },

  async getUser(req, res) {
    res.send("Get user");
  },

  async createUser(req, res) {
    res.send("create user");
  },

  async updateUser(req, res) {
    res.send("update user");
  },

  async deleteUser(req, res) {
    res.send("delete user");
  },

  async addFriendToUser(req, res) {
    res.send("add friend to user");
  },

  async deleteFriendFromUser(req, res) {
    res.send("delete friend from user");
  },
};

module.exports = user;
