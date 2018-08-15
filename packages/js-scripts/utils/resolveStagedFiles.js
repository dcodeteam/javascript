"use strict";

const path = require("path");
const mm = require("micromatch");
const sgf = require("staged-git-files");
const filterOutIgnored = require("./filterOutIgnored");

function getStagedFiles() {
  return new Promise((resolve, reject) => {
    sgf("ACMR", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.map(x => x.filename));
      }
    });
  });
}

module.exports = async function resolveStagedFiles(patterns, ignoreFiles) {
  const allStagedFiles = await getStagedFiles();
  const stagedFiles = mm(allStagedFiles, patterns);

  return filterOutIgnored(stagedFiles, ignoreFiles).map(x => path.resolve(x));
};
