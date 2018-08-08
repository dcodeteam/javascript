"use strict";

const inquirer = require("inquirer");

const spawn = require("../utils/spawn");
const isYarn = require("../utils/isYarn");

module.exports = { init };

function init() {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "modules",
        message: "Choose Modules",

        choices: [
          "@dc0de/eslint-config",
          "@dc0de/eslint-config-base",
          "@dc0de/eslint-config-node",
          "@dc0de/eslint-config-react",
          "@dc0de/eslint-config-react-native",
        ],

        validate: modules => Boolean(modules && modules.length > 0),
      },
    ])

    .then(({ modules }) => {
      const dependencies = new Set();

      modules.forEach(moduleName => {
        const { version, peerDependencies } = getPackageInfo(moduleName);

        dependencies.add(`${moduleName}@${version}`);

        Object.keys(peerDependencies).forEach(x => {
          dependencies.add(`${x}@${peerDependencies[x]}`);
        });
      });

      install(Array.from(dependencies).join(" "));
    });
}

function trySpawn(command, args, options) {
  const { stdout, status } = spawn(command, args, options);

  if (status !== 0) {
    process.exit(1);
  }

  return stdout.toString();
}

function getPackageInfo(moduleName) {
  const json = trySpawn("npm", ["view", moduleName, "--json"]);

  return JSON.parse(json);
}

function install(dependencies) {
  return isYarn()
    ? trySpawn("yarn", ["add", dependencies, "-D"])
    : trySpawn("npm", ["install", dependencies, "-D"]);
}
