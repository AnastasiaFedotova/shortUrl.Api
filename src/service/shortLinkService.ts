import Link from "../models/links";
import { LinksInterface } from "./../interfaces/links";
import getRandomUrl from "./../utils/getRandomUrl";

async function addLink(link: { url: string; }, userId: string): Promise<LinksInterface> {
  try {
    const shortUrlLength = 5;
    const newLink: LinksInterface = {
      original_url: link.url,
      short_url: getRandomUrl(shortUrlLength),
      user_id: userId || null,
      view_count: null
    };

    const res = await Link.create(newLink);
    return res;
  } catch (err) {
    console.log(err)
  }
}

async function readLinksList(): Promise<Array<Link>> {
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

async function addViews(shortlink: string): Promise<void> {
  try {
    const link = await Link.findAll({ where: { short_url: shortlink }, raw: true });
    let views = link[0].view_count;
    await Link.update({ view_count: views ? ++views : 1 }, { where: { short_url: shortlink } });
  } catch (err) {
    console.log(err)
  }
}

export const urlService = {
  addLink,
  readLinksList,
  readUserList,
  addViews
};
