const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const graphite = artifacts.require('graphite');

const ezofisAddress = '0x7fc5d61e3dbf2a69e8F647073D2Ccbbbdb62c26A';

module.exports = async function (deployer) {
  const instance = await deployProxy(graphite,[ezofisAddress],{ deployer, initializer: 'initialize' });
  console.log('Deployed', instance.address);
};






