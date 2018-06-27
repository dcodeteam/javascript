"use strict";

const crossSpawn = require("cross-spawn");

module.exports = function spawn(command, args, options) {
  const result = crossSpawn.sync(command, args, options);

  if (result.signal) {
    if (result.signal === "SIGKILL") {
      console.log(
        "The process failed because the process exited too early. " +
          "This probably means the system ran out of memory or someone called " +
          "`kill -9` on the process.",
      );
    }

    if (result.signal === "SIGTERM") {
      console.log(
        "The process failed because the process exited too early. " +
          "Someone might have called `kill` or `killall`, or the system could " +
          "be shutting down.",
      );
    }

    process.exit(1);
  }

  if (result.status !== 0 && result.stdout && result.stdout.length > 0) {
    process.stderr.write(result.stdout);
  }

  if (result.stderr && result.stderr.length > 0) {
    process.stderr.write(result.stderr);
  }

  return result;
};
