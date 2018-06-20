"use strict";

const minimist = require("minimist");

module.exports = function createContext(args) {
  const params = minimist(args);
  const { _: patterns } = params;

  delete params._;

  return { params, patterns, args: args.filter(x => !patterns.includes(x)) };
};
