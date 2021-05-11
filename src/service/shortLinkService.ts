const getRandomUrl = require("./../utils/getRandomUrl");
const { LinksModel } = require("./../config/dbShema");
const { Links } = require("./../interface/links");

//function add(link: Links): Promise<Links> {
function addLink(link: typeof Links): Promise<typeof Links> {
  const res = LinksModel.create(link).catch(err => {
    console.log(err)
  })

  return res;
}

const urlService = {
  addLink
};

module.exports = urlService;
