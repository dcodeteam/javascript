"use strict";

const inquirer = require("inquirer");

const spawn = require("../utils/spawn");

module.exports = { init };

function init() {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "modules",
        message: "Choose Modules",

        choices: [
          "prettier",
          "stylelint",

          "@dc0de/eslint-config",
          "@dc0de/eslint-config-base",
          "@dc0de/eslint-config-node",
          "@dc0de/eslint-config-react",
          "@dc0de/eslint-config-react-native",
        ],

        validate: modules => Boolean(modules && modules.length > 0),
      },

      {
        type: "list",
        name: "binary",
        message: "Select package manager",

        choices: ["npm", "yarn"],

        default: "npm",
      },
    ])

    .then(({ binary, modules }) => {
      const modulesMap = new Map();

      modules.forEach(moduleName => {
        fulfillModulesMap(moduleName, null, modulesMap);
      });

      const dependencies = Array.from(modulesMap).map(
        ([key, value]) => `${key}@${value}`,
      );

      install(binary, dependencies);
    });
}

function fulfillModulesMap(moduleName, moduleVersion, modulesMap) {
  const { version, peerDependencies } = getPackageInfo(
    moduleName,
    moduleVersion,
  );

  if (!modulesMap.has(moduleName)) {
    modulesMap.set(moduleName, version);
  }

  if (peerDependencies) {
    Object.keys(peerDependencies).forEach(x => {
      const peerModule = x;
      const peerModuleVersion = peerDependencies[x];

      if (!modulesMap.has(peerModule)) {
        modulesMap.set(peerModule, peerModuleVersion);
        fulfillModulesMap(peerModule, peerModuleVersion, modulesMap);
      }
    });
  }
}

function trySpawn(command, args, options) {
  const { stdout, status } = spawn(command, args, options);

  if (status !== 0) {
    process.exit(1);
  }

  return stdout.toString();
}

function getPackageInfo(moduleName, moduleVersion) {
  const json = trySpawn("npm", [
    "view",
    !moduleVersion ? moduleName : `${moduleName}@${moduleVersion}`,
    "--json",
  ]);

  const result = JSON.parse(json);

  return Array.isArray(result) ? result.pop() : result;
}

function install(binary, dependencies) {
  return binary === "yarn"
    ? trySpawn("yarn", ["add", ...dependencies, "-D"])
    : trySpawn("npm", ["install", ...dependencies, "-D"]);
}
