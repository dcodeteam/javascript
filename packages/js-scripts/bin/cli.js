#!/usr/bin/env node

"use strict";

const program = require("commander");
const pkg = require("../package.json");
const { lint } = require("../src/lint/lint");
const { init } = require("../src/init/init");

process.on("unhandledRejection", err => {
  if (err) {
    if (err.stack) {
      console.error(err.stack);
    } else if (err.message) {
      console.error(err.message);
    }
  }

  process.exit(1);
});

program.version(pkg.version);

program
  .command("init")
  .description("init modules")
  .action(() => {
    init();
  });

program
  .command("lint")
  .description("run linters")
  .option("--cache", "use file cache", false)
  .option("-f, --fix", "automatically fix lint errors", false)
  .option("-s, --staged", "only lint git staged files", false)
  .action(options => {
    lint({
      cwd: process.cwd(),
      fix: options.fix,
      cache: options.cache,
      staged: options.staged
    });
  });

program.command("*", "", { noHelp: true }).action(command => {
  console.error("\n  error: unknown command `%s`\n", command);

  process.exit(1);
});

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
