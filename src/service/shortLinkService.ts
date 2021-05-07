function add(url : string) : string {
  return url[0] + url.length + ".shl"
}

const urlService = {
  add
};

module.exports = urlService;
