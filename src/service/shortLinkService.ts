import Link, { Links } from "../models/links";

async function add(link: Links): Promise<Links> {
  try {
    const res = await Link.create(link);
    return res;
  } catch (err) {
    console.log(err)
  }
}

async function read(): Promise<Array<Link>> {
  try {
    const res = await Link.findAll();
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const urlService = {
  add,
  read
};
