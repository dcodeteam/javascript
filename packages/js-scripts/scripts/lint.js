"use strict";

const spawn = require("../utils/spawn");
const resolveBin = require("../utils/resolveBin");
const resolveFiles = require("../utils/resolveFiles");
const createContext = require("../utils/createContext");

const { args, patterns } = createContext(process.argv.slice(2));

const eslintCliPath = resolveBin("eslint");
const files = resolveFiles(patterns, "**/*.{js,jsx,ts,tsx}", [".gitignore"]);

if (patterns.length > 0 && files.length === 0) {
  console.warn("Can not find files for pattern:\n %s", patterns.join("\n "));

  process.exit(1);
}

if (files.length > 0) {
  spawn("node", [eslintCliPath, ...files, ...args]);
}
