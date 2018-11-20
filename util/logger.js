/* eslint no-console: 0 */

require('colors');
const moment = require('moment-timezone');

const { TIME_ZONE, ENV } = process.env;

const getTime = () => moment().tz(TIME_ZONE).format('DD/MM/YYYY HH:mm:ss').italic.white;

function log(level, message) {
  switch (level) {
    case 0:
      console.log(`${getTime()} ${'[INFO]'.green}`, message);
      break;
    case 1:
      console.log(`${getTime()} ${'[WARN]'.orange}`, message);
      break;
    case 2:
      console.log(`${getTime()} [ERROR]`.red, message);
      break;
    default:
      break;
  }
}

const empty = () => null;

const info = message => log(0, message);
const warn = message => log(1, message);
const error = message => log(2, message);

module.exports = ENV === 'test' ? { error, info: empty, warn: empty } : { info, warn, error };
