const getRandomUrl = require("./../utils/getRandomUrl");

function add(url : string) : string {
  return `${url}: ${getRandomUrl()};`;
}

const urlService = {
  add
};

module.exports = urlService;
