const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Graphitev3 = artifacts.require('graphitev3');
const graphitev4 = artifacts.require('graphitev4');

module.exports = async function (deployer) {
  const existing = await Graphitev3.deployed();
  const instance = await upgradeProxy(existing.address, graphitev4, { deployer });
  console.log("Upgraded", instance.address);
};