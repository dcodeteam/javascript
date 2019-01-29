"use strict";

const { CLIEngine } = require("eslint");

const cleanupNodePath = x => x && x.replace(/(.*)node_modules/, "node_modules");

module.exports = initESLintTest;

function initESLintTest(name, configFile) {
  const createCli = () => new CLIEngine({ configFile, useEslintrc: false });

  describe(name, () => {
    it("should not throw on init", () => {
      expect(createCli).not.toThrow();
    });

    it("should be same for all extensions", () => {
      const cli = createCli();
      const configs = ["js", "ts", "tsx"].map(x =>
        cli.getConfigForFile(`index.${x}`),
      );
      const firstConfig = configs.pop();

      configs.forEach(x => {
        expect(x).toEqual(firstConfig);
      });
    });

    it("should properly extend parent rules", () => {
      const cli = createCli();
      const {
        parser,
        extends: extendsConfigs,
        ...composedConfig
      } = cli.getConfigForFile("./index.js");

      expect(cleanupNodePath(parser)).toMatchSnapshot();
      expect(extendsConfigs.map(cleanupNodePath)).toMatchSnapshot();

      expect(composedConfig).toMatchSnapshot();
    });
  });
}
