"use strict";

const path = require("path");

module.exports = function resolveBin(moduleName, binName) {
  const pkgPath = require.resolve(`${moduleName}/package.json`);
  const pkgRootPath = path.dirname(pkgPath);
  const pkg = require(pkgPath);

  const bin = binName || moduleName;

  return path.join(
    pkgRootPath,
    typeof pkg.bin === "string" ? pkg.bin : pkg.bin[bin],
  );
};
