const utills = {
  formatDate(timestamp) {
    var date = new Date(timestamp);
    return date.toDateString();
  },
};

module.exports = utills;
