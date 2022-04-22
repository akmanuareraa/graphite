// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ierc20burnableupgradable.sol";

contract AssetMinter is Ownable{ 
    
    IERC20BurnableUpgradeable public GPI;

    constructor(address gpiTokenAddress){
        GPI = IERC20BurnableUpgradeable(gpiTokenAddress);
    }

    mapping(bytes32 => uint256) public assetsIssued;

    uint public txnfee = 1412;

    event assetIssued(bytes32 indexed assetHash);

    function changeTxnFee(uint newTxnFee) external onlyOwner {
        txnfee = newTxnFee;
    }

    function issueAsset(bytes32 assetHash) public onlyOwner onlyNotIssued(assetHash) {
        require(
            GPI.allowance(msg.sender, address(this)) >= txnfee,
            "GPI Token allowance too low for processing Transaction Fee"
        );

        _safeTransferFrom(msg.sender, address(this), txnfee * 10  ** GPI.decimals());

        assetsIssued[assetHash] = block.number;
        
        emit assetIssued(assetHash);

        GPI.burn(txnfee);

        
    }

    function getBlockNumber(bytes32 assetHash) public view onlyIssued(assetHash) returns (uint256) {
        return assetsIssued[assetHash];
    }

    function isIssued(bytes32 assetHash) public view returns (bool) {
        return (assetsIssued[assetHash] != 0);
    }

    function _safeTransferFrom (
        address sender,
        address recipient,
        uint amount
    ) private {
        bool sent = GPI.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
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
