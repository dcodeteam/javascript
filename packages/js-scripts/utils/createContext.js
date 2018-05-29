"use strict";

const minimist = require("minimist");

module.exports = function createContext(args) {
  const { _: patterns, ...params } = minimist(args);

  return { params, patterns, args: args.filter(x => !patterns.includes(x)) };
};
