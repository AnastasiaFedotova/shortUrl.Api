const { LinksModel } = require("./../config/dbShema");
const { Links } = require("./../interface/links");

//function add(link: Links): Promise<Links> {
async function add(link: typeof Links): Promise<typeof Links> {
  const res = await LinksModel.create(link).catch(err => {
    console.log(err)
  })

  return res;
}

async function read(): Promise<Array<typeof Links>> {
  return await LinksModel.findAll();
}

const urlService = {
  add,
  read
};

export = urlService;
