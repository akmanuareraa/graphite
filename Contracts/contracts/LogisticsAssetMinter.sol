// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";



contract LogisticsAssetMinter is Initializable,OwnableUpgradeable, UUPSUpgradeable{ 
    
    function initialize() initializer public {
        __Ownable_init();
        __UUPSUpgradeable_init();

    }

    struct asset
    {
        uint256 blockNumber;
        bool customerApproval;
        address customer;

    }

    mapping(bytes32 => asset) public assetsIssued;

    
    event assetIssued(bytes32 indexed assetHash);
    event customerApproved(asset Asset);


    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    
    function issueAsset(bytes32 assetHash, address customer) public onlyNotIssued(assetHash) {

        asset storage a = assetsIssued[assetHash];
        a.blockNumber = block.number;
        a.customer = customer;
        a.customerApproval = false;

        emit assetIssued(assetHash);
        
    }

    function getBlockNumber(bytes32 assetHash) public view onlyIssued(assetHash) returns (uint256) {
        
        asset storage a = assetsIssued[assetHash];
        
        return a.blockNumber;
    }

    function addCustomerApproval(bytes32 assetHash) public onlyIssued(assetHash) returns (asset memory) {
        
        asset storage a = assetsIssued[assetHash];
        
        require( a.customer == msg.sender  , "Error: Invalid customer key used for signing");

        a.customerApproval = true;

        emit customerApproved(a);

        return a;
        
    }


    function isIssued(bytes32 assetHash) public view returns (bool) {

        return (assetsIssued[assetHash].blockNumber > 0);
    }


    modifier onlyIssued(bytes32 assetHash) {
        require(isIssued(assetHash), "Error: No such asset exists in the Database");
        _;
    }

    modifier onlyNotIssued(bytes32 assetHash) {
        require(!isIssued(assetHash), "Error: The Asset has already been issued. Re-Issue is not applicable.");
        _;
    }

}
