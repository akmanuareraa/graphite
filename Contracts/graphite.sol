// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


contract graphite is Initializable, ERC20CappedUpgradeable, ERC20BurnableUpgradeable, OwnableUpgradeable, UUPSUpgradeable{
  

    
    function initialize(address graphiteOwner) initializer public {
        __ERC20_init("Graphite", "GPI");
        __ERC20Capped_init(1000000000 * 10 ** decimals());
        __Ownable_init();
        __UUPSUpgradeable_init();

        _mint(graphiteOwner, 150000000 * 10 ** decimals()); // Founding team holds 15%
    }

    //Can only be minted externally 

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function _mint(address to, uint256  amount)
        internal
        override (ERC20CappedUpgradeable,ERC20Upgradeable)
    {
        ERC20CappedUpgradeable._mint(to, amount);

    }


    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
    
    
    function getVersion() public pure returns (string memory) {
        return "Graphite(GPI) Version - 1.0";
    }
    

    function getTokenName() public view returns (string memory) {
        return name();
    }

    function getTokenSymbol() public view returns (string memory) {
        return symbol();
    }

    function decimals() public pure override returns (uint8) {
        return 18;
    }

}

