const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment.utc(fixture.kick_off).local().format('HH:mm A')
  };
}

module.exports = formatMessage;
