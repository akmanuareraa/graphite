const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const Graphite = artifacts.require('graphite');
const graphitev2 = artifacts.require('graphitev2');

module.exports = async function (deployer) {
  const existing = await Graphite.deployed();
  const instance = await upgradeProxy(existing.address, graphitev2, { deployer });
  console.log("Upgraded", instance.address);
};