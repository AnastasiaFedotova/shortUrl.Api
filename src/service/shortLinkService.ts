import Link from "../models/links";
import Tag from "../models/tags";
import { CustomLink, LinksInterface } from "./../interfaces/links";
import getRandomUrl from "./../utils/getRandomUrl";

async function addLink(link: { url: string, tags: string[] }, userId: number): Promise<LinksInterface> {
  try {
    const shortUrlLength = 5;
    let randomUrl: string = getRandomUrl(shortUrlLength);
    let isUnique: boolean = await findLinkByShortUrl(randomUrl);

    while (isUnique) {
      randomUrl = getRandomUrl(shortUrlLength);
      const checkedLink = await findLinkByShortUrl(randomUrl);
      if (checkedLink) isUnique = false;
    }

    const tagPromises: Promise<Tag>[] = [];
    const tagArray: Tag[] = [];

    if (link.tags) {
      for (const elem of link.tags) {
        const isTagExists = await Tag.findOne({
          where: {
            name: elem
          }
        })

        if (!isTagExists) {
          const newTag = Tag.create({
            name: elem
          });
          tagPromises.push(newTag);
        } else {
          tagArray.push(isTagExists);
        }
      }
    }

    const tags = tagArray.concat(await Promise.all(tagPromises));

    const newLink = await Link.create({
      original_url: link.url,
      short_url: randomUrl,
      user_id: +userId || null,
      view_count: null
    });

    tags.forEach(tag => {
      newLink.addTag(tag, {
        through: {
          link_id: newLink.id,
          tag_id: tag.id
        }
      });
    });

    const res = {
      id: newLink.id,
      short_url: newLink.short_url,
      original_url: newLink.original_url,
      user_id: newLink.user_id,
      view_count: newLink.view_count,
      tags: link.tags
    }

    return res
  } catch (err) {
    console.log(err)
  }
}

async function readLinksList(): Promise<Array<LinksInterface>> {
  try {
    const links = await Link.findAll({ include: [Tag], raw: true });

    return links.map(link => {
      return {
        id: link.id,
        short_url: link.short_url,
        original_url: link.original_url,
        user_id: link.user_id,
        view_count: link.view_count,
        tag: link["Tags.name"]
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function readLinksListByTag(tag: string): Promise<Array<Link>> {
  const links = await Link.findAll({
    include: [Tag], raw: true
  });

  return links.filter(link => {
    return link["Tags.name"] === tag
  });
}

async function readUserList(userId: number): Promise<Array<Link>> {
  try {
    return Link.findAll({
      where: { user_id: +userId },
      raw: true
    });
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
  readLinksListByTag,
  readUserList,
  addViews,
  findLinkByShortUrl,
  renameLink
};
