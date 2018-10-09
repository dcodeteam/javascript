"use strict";

const { createHash } = require("crypto");

module.exports = function sha512(value) {
  const hash = createHash("sha256");

  hash.update(value);

  return hash.digest("hex");
};
