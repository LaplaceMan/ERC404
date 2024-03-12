//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC404} from "./ERC404.sol";

contract ERC404Imp is Ownable, ERC404 {
  uint256 public immutable MAX_ERC20_TOTAL_SUPPLY;

  string internal _baseUri;

  constructor(
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    address initialOwner_
  ) ERC404(name_, symbol_, decimals_) Ownable(initialOwner_) {
    MAX_ERC20_TOTAL_SUPPLY = 2100_0000 * (10 ** decimals_);
  }

  error OverLimit();
  event UpdateBaseURI(string _uri);

  function mintERC20(address account_, uint256 value_) external {
    if (MAX_ERC20_TOTAL_SUPPLY < totalSupply + value_) revert OverLimit();
    _mintERC20(account_, value_);
  }

  function setBaseURI(string memory uri_) external onlyOwner {
    _baseUri = uri_;

    emit UpdateBaseURI(uri_);
  }

  function tokenURI(uint256 id_) public view override returns (string memory) {
    return string.concat(_baseUri, Strings.toString(id_));
  }
}
