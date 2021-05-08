const getRandomUrl = require("./../utils/getRandomUrl");
const { LinksModel } = require("./../config/linksdb");
const { Links } = require("./../interface/link");

function add<T>(link : typeof Links) : Promise<T> {
  const res = LinksModel.create({
    original_url: link.original_url,
    short_url: getRandomUrl(),
    user_id: null,
    view_count: null
  }).catch(err => {
    console.log(err)
  })

  return res;
}

const urlService = {
  add
};

module.exports = urlService;
