const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const graphite = artifacts.require('graphite');

module.exports = async function (deployer) {
  const instance = await deployProxy(graphite, '', { deployer });
  console.log('Deployed', instance.address);
};




