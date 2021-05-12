import Links from "./../interface/links";

async function add(link: Links): Promise<Links> {
  const res = await Links.create(link);

  return res;
}

async function read(): Promise<Array<Links>> {
  try {
    return await Links.findAll();
  } catch (err) {
    console.log(err)
  }
}

const urlService = {
  add,
  read
};

export default urlService;
