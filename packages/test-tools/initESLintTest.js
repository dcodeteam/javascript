"use strict";

const { CLIEngine } = require("eslint");

module.exports = function initESLintTest(name, configFile) {
  const baseConfig = require(configFile);
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

      configs.slice(1).forEach(x => {
        expect(x).toEqual(configs[0]);
      });
    });

    it("should properly extend parent rules", () => {
      const cli = createCli();
      const composedConfig = cli.getConfigForFile("./index.js");

      Object.keys(baseConfig).forEach(key => {
        const base = baseConfig[key];
        const composed = composedConfig[key];

        if (typeof base === "object") {
          if (Array.isArray(base)) {
            expect(composed).toEqual(expect.arrayContaining(base));
          } else {
            expect(composed).toMatchObject(base);
          }
        } else if (key === "parser") {
          expect(composed).toEqual(expect.stringContaining(base));
        } else {
          expect(composed).toEqual(base);
        }
      });

      Object.keys(composedConfig).forEach(key => {
        const config =
          key !== "parser" && key !== "extends"
            ? composedConfig[key]
            : composedConfig.extends.map(x => {
                const idx = x.indexOf("node_modules");

                return idx === -1 ? x : x.slice(idx);
              });

        expect(config).toMatchSnapshot(key);
      });
    });
  });
};
