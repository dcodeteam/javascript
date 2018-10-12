"use strict";

module.exports = function initJestPresetTest(name, configFile) {
  describe(name, () => {
    it("should match snapshot", () => {
      expect(require(configFile)).toMatchSnapshot();
    });
  });
};
