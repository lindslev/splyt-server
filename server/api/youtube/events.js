var events = {}

module.exports = {
    on: function(event, cb) {
        events[event] = cb;
    },
    trigger: function(event, data) {
        events[event](data);
    }
}
