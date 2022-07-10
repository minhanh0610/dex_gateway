const TestPancake = artifacts.require("TestPancake");

module.exports = function (deployer) {
  deployer.deploy(TestPancake);
};
