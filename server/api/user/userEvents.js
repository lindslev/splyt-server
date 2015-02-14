var events = {}
var mailman = {}

module.exports = {
    on: function(event, cb) {
        events[event] = cb;
    },
    trigger: function(event, data) {
        events[event](data);
    },
    pass: function(key, value) {
      mailman[key] = value;
    },
    receive: function(key) {
      return mailman[key];
    }
}
