
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const LogisticsAssetMinter = artifacts.require('LogisticsAssetMinter');


module.exports = async function (deployer) {
  
  const instance = await deployProxy(LogisticsAssetMinter,[],{ deployer, initializer: 'initialize' });
  console.log('Deployed', instance.address);
};






