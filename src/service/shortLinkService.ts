function generate(url : string) : string {
  return url[0] + url.length + ".shl"
}

const shortenesService = {
  generate
};

module.exports = shortenesService;
