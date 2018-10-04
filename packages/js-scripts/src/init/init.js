"use strict";

const _ = require("lodash");
const inquirer = require("inquirer");

const spawn = require("../utils/spawn");

module.exports = { init };

function joinNameWithVersion(name, version) {
  return [name, version].filter(Boolean).join("@");
}

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

      console.log("Fetching dependency tree:");

      modules.forEach(moduleName => {
        fulfillModulesMap(moduleName, null, modulesMap);
      });

      const dependencies = Array.from(modulesMap).map(([pkg, version]) =>
        joinNameWithVersion(pkg, version),
      );

      console.log("Installing %d dependencies.", dependencies.length);

      install(binary, dependencies);
    });
}

const fetchPackageInfo = _.memoize(nameWithVersion => {
  const json = trySpawn("npm", ["view", nameWithVersion, "--json"]);

  const result = JSON.parse(json);

  return Array.isArray(result) ? result.pop() : result;
});

function fulfillModulesMap(
  moduleName,
  moduleVersion,
  modulesMap,
  indent = "  ",
) {
  const nameWithVersion = joinNameWithVersion(moduleName, moduleVersion);
  const { peerDependencies } = fetchPackageInfo(nameWithVersion);

  console.log("%s%s", indent, nameWithVersion);

  if (!modulesMap.has(moduleName)) {
    modulesMap.set(moduleName, moduleVersion);
  }

  if (peerDependencies) {
    Object.keys(peerDependencies).forEach(x => {
      const peerModule = x;
      const peerModuleVersion = peerDependencies[x];

      if (!modulesMap.has(peerModule)) {
        modulesMap.set(peerModule, peerModuleVersion);
        fulfillModulesMap(
          peerModule,
          peerModuleVersion,
          modulesMap,
          `${indent}  `,
        );
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

function install(binary, dependencies) {
  return binary === "yarn"
    ? trySpawn("yarn", ["add", ...dependencies, "-D"])
    : trySpawn("npm", ["install", ...dependencies, "-D"]);
}
