"use strict";

const fs = require("fs");

const { sortImports } = require("import-sort");
const { default: style } = require("import-sort-style-module");
const babylonParser = require("import-sort-parser-babylon");
const typescriptParser = require("import-sort-parser-typescript");

const spawn = require("../utils/spawn");
const resolveBin = require("../utils/resolveBin");
const resolveFiles = require("../utils/resolveFiles");
const createContext = require("../utils/createContext");

const { params, patterns } = createContext(process.argv.slice(2));

const files = resolveFiles(
  patterns,
  "**/*.{js,jsx,ts,tsx,md,json,css,scss,less}",
  [".gitignore", ".prettierignore"],
);

const diff = [];
const write = !params.l;

if (files.length > 0) {
  files.forEach(x => {
    const parser =
      x.endsWith(".js") || x.endsWith(".jsx")
        ? babylonParser
        : x.endsWith(".ts") || x.endsWith(".tsx")
          ? typescriptParser
          : null;

    if (parser) {
      const content = fs.readFileSync(x, "utf-8");
      const sortResult = sortImports(content, parser, style, x, {
        parser,
        style,
        options: {},
      });

      if (sortResult.changes.length > 0) {
        if (write) {
          fs.writeFileSync(x, sortResult.code, "utf-8");
        } else {
          diff.push(x);
        }
      }
    }
  });

  if (diff.length > 0) {
    console.log(diff.join("\n"));
    process.exit(1);
  }

  const prettierPath = resolveBin("prettier");

  spawn("node", [prettierPath, ...files, write ? "--write" : "-l"]);
}