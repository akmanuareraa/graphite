const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Graphitev2 = artifacts.require('graphitev2');
const graphitev3 = artifacts.require('graphitev3');

module.exports = async function (deployer) {
  const existing = await Graphitev2.deployed();
  const instance = await upgradeProxy(existing.address, graphitev3, { deployer });
  console.log("Upgraded", instance.address);
};