#!/usr/bin/env node

"use strict";

process.on("unhandledRejection", err => {
  throw err;
});

const spawn = require("../utils/spawn");
const createContext = require("../utils/createContext");

const scripts = ["lint", "reformat"];
const args = process.argv.slice(2);
const scriptIndex = args.findIndex(x => scripts.includes(x));
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
const scriptArgs = args.slice(scriptIndex);

const ctx = createContext(scriptArgs);

if (ctx.patterns.length === 0) {
  console.log("No script was specified. Use one of: %s.", scripts.join(", "));

  process.exit(1);
} else {
  const [script, ...scriptPattern] = ctx.patterns;

  if (!scripts.includes(script)) {
    console.log(
      'Unknown script "%s". Use one of: %s.',
      script,
      scripts.join(", "),
    );

    process.exit(1);
  } else {
    const scriptPath = require.resolve(`../scripts/${script}`);

    spawn("node", [...nodeArgs, scriptPath, ...scriptPattern, ...ctx.args], {
      stdio: "inherit",
    });
  }
}
