import Link from "../models/links";
import { LinksInterface } from "./../interfaces/links";

async function add(link: LinksInterface): Promise<LinksInterface> {
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

async function readUserList(userId: string): Promise<Array<Link>> {
  try {
    const userList = await Link.findAll({
      where: { user_id: userId },
      raw: true
    });

    return userList;
  } catch (err) {
    console.log(err)
  }
}

export const urlService = {
  add,
  read,
  readUserList
};
