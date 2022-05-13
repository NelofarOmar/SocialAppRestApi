const thought = {
  async getAllThoughts(req, res) {
    res.send("get all thoughts");
  },

  async createThought(req, res) {
    res.send("create thoughts");
  },

  async getThought(req, res) {
    res.send("get thought");
  },

  async updateThought(req, res) {
    res.send("update thought");
  },

  async deleteThought(req, res) {
    res.send("delete thought");
  },

  async createReaction(req, res) {
    res.send("create reaction");
  },

  async deleteReaction(req, res) {
    res.send("delete reaction");
  },
};

module.exports = thought;
