const utills = {
  formatDate(timestamp) {
    var date = new Date(timestamp);
    return date.toDateString();
  },
  responder(code, body, res) {
    res.status(code).json(body);
  },
};

module.exports = utills;
