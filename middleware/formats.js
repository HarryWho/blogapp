const moment = require('moment')

module.exports = {
  formatDate: function(date, format) {
    return moment(date).format(format)
  },
  truncate: function(str, len) {
    let retStr = str.substring(0, len);
    return retStr.substring(0, retStr.lastIndexOf(' ')) + "... "
  },
  stripHTML: function(str) {
    return str.replace(/<[^>]+>/g, '');
  }
}