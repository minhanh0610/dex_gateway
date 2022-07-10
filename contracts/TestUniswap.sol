// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./interfaces/IERC20.sol";
import "./interfaces/Uniswap.sol";


contract TestUniswap {
  
    address private constant UNISWAP_V2_ROUTER =
      0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  
  function swapEthforToken(address token, uint ethAmount) external payable{
    uint deadline = block.timestamp + 150;

    address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = token;

    uint amountOutMin = IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(ethAmount, path)[1];
    IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactETHForTokens{value: msg.value}(amountOutMin, path, msg.sender, deadline);
  }

  function swapTokenforEth(address token, uint tokenAmount) external payable{
    uint deadline = block.timestamp + 150;
    address[] memory path = new address[](2);
        path[0] = token;
        path[1] = WETH;

    uint amountOutMin = IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(tokenAmount, path)[1];
        IERC20(token).transferFrom(msg.sender, address(this), tokenAmount);
        IERC20(token).approve(UNISWAP_V2_ROUTER, tokenAmount);
        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForETH(tokenAmount, amountOutMin, path, msg.sender, deadline);
    
  }


  function swap(
    address _tokenIn,
    address _tokenOut,
    uint _amountIn,
    //uint _amountOutMin,
    address _to
  ) external {
    IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
    IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amountIn);

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
   
    uint[] memory amountOutMins =
      IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(_amountIn, path);

    uint _amountOutMin = amountOutMins[path.length - 1];



    IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
      _amountIn,
      _amountOutMin,
      path,
      _to,
      block.timestamp
    );
  }

  function getAmountOutMin(
    address _tokenIn,
    address _tokenOut,
    uint _amountIn
  ) external view returns (uint) {
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

    // same length as path
    uint[] memory amountOutMins =
      IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(_amountIn, path);

    return amountOutMins[path.length - 1];
  }
}