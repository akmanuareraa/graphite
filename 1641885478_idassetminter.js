
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const IDAssetMinter = artifacts.require('IDAssetMinter');
const graphite = artifacts.require('graphite');




module.exports = async function (deployer) {
  const graphiteInstance = await graphite.deployed();
  const instance = await deployProxy(IDAssetMinter,[graphiteInstance.address],{ deployer, initializer: 'initialize' });
  console.log('Deployed', instance.address);
};






