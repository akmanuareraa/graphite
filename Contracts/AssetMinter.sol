// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IERC20Burnable.sol";

contract AssetMinter is Ownable{ 
    
    IERC20BurnableUpgradeable public GPI;

    constructor(address gpiTokenAddress){
        GPI = IERC20BurnableUpgradeable(gpiTokenAddress);
    }

    mapping(bytes32 => uint256) public documentIssued;
    uint public txnfee = 1412;

    event DocumentIssued(bytes32 indexed document);

    function changeTxnFee(uint newTxnFee) external onlyOwner {
        txnfee = newTxnFee;
    }

    //issueAsset
    function issueBlockNumber(bytes32 document) public onlyOwner onlyNotIssued(document) {
        require(
            GPI.allowance(msg.sender, address(this)) >= txnfee,
            "GPI Token allowance too low for processing Transaction Fee"
        );

        _safeTransferFrom(msg.sender, address(this), txnfee);

        documentIssued[document] = block.number;
        //assetIssued
        emit DocumentIssued(document);

        GPI.burn(txnfee);
    }

    function getBlockNumber(bytes32 document) public view onlyIssued(document) returns (uint256) {
        return documentIssued[document];
    }

    function isIssued(bytes32 document) public view returns (bool) {
        return (documentIssued[document] != 0);
    }

    function _safeTransferFrom (
        address sender,
        address recipient,
        uint amount
    ) private {
        bool sent = GPI.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }

    modifier onlyIssued(bytes32 document) {
        require(isIssued(document), "Error: No such document exists in the Database");
        _;
    }

    modifier onlyNotIssued(bytes32 document) {
        require(!isIssued(document), "Error: The Document has already been issued. Re-Issue is not applicable.");
        _;
    }

}
