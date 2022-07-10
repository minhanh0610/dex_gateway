// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/IERC20.sol";
import "./interfaces/Pancake.sol";


contract TestPancake{
    address private constant PANCAKE_ROUTER =
      0x10ED43C718714eb63d5aA57B78B54704E256024E;

    address private constant FACTORY = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;

    address private constant WETH = 0x5DA5DA6933637c1cAfa5de9FdF2aCb1B3758C9e3;


    function swap(
    address _tokenIn,
    address _tokenOut,
    uint _amountIn,
    uint _amountOutMin,
    address _to
  ) external {
    IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
    IERC20(_tokenIn).approve(PANCAKE_ROUTER, _amountIn);

    address[] memory path;

     if (_tokenIn == WETH || _tokenOut == WETH) {
      path = new address[](2);
      path[0] = _tokenIn;
      path[1] = _tokenOut;
    } else {
      path = new address[](3);
      path[0] = _tokenIn;
      path[1] = WETH;
      path[2] = _tokenOut;
    }

     IPancakeRouter02(PANCAKE_ROUTER).swapExactTokensForTokens(
      _amountIn,
      _amountOutMin,
      path,
      _to,
      block.timestamp
    );

  }
}