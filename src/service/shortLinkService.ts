import Link from "../models/links";
import { CustomLink, LinksInterface } from "./../interfaces/links";
import getRandomUrl from "./../utils/getRandomUrl";

async function addLink(link: { url: string, tags: string[] }, userId: string): Promise<LinksInterface> {
  try {
    const shortUrlLength = 5;
    let randomUrl: string = getRandomUrl(shortUrlLength);
    let isUnique: boolean = await findLinkByShortUrl(randomUrl);

    while (isUnique) {
      randomUrl = getRandomUrl(shortUrlLength);
      const checkedLink = await findLinkByShortUrl(randomUrl);
      if (checkedLink) isUnique = false;
    }

    const newLink: LinksInterface = {
      original_url: link.url,
      short_url: randomUrl,
      user_id: userId || null,
      view_count: null,
      tags: link.tags || null
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
    const views = Number(link[0].view_count) + 1;
    await Link.update({ view_count: views }, { where: { short_url: shortlink } });
  } catch (err) {
    console.log(err)
  }
}

async function findLinkByShortUrl(shortUrl: string): Promise<boolean> {
  try {
    const link = await Link.findOne({ where: { short_url: shortUrl }, raw: true });
    if (link) return true;
    return false;
  } catch (err) {
    console.log(err);
  }
}

async function renameLink(link: CustomLink): Promise<string> {
  try {
    const isUniqueUrl = await findLinkByShortUrl(link.customUrl);

    if (isUniqueUrl) throw new Error("not the unique url");

    await Link.update({ short_url: link.customUrl }, { where: { short_url: link.shortUrl } });
    return link.customUrl;
  } catch (err) {
    console.log(err);
  }
}

export const urlService = {
  addLink,
  readLinksList,
  readUserList,
  addViews,
  findLinkByShortUrl,
  renameLink
};
