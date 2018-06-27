#!/usr/bin/env node

"use strict";

const program = require("commander");
const pkg = require("../package.json");
const { lint } = require("../scripts/lint");

process.on("unhandledRejection", err => {
  if (err && err.message) {
    console.error(err.message);
  }

  process.exit(1);
});

program.version(pkg.version);

program
  .command("lint [options]")
  .description("run linters")
  .option("-f, --fix", "automatically fix lint errors")
  .action((cmd, options) => {
    lint({ fix: options.fix });
  });

program.command("*", "", { noHelp: true }).action(command => {
  console.error("\n  error: unknown command `%s`\n", command);

  process.exit(1);
});

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
