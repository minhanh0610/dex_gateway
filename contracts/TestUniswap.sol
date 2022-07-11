// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// import "./interfaces/IERC20.sol";
// import "./interfaces/Uniswap.sol";
import '@uniswap/v2-periphery/contracts/UniswapV2Router02.sol';

contract TestUniswap {
  
  address internal constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 public uniswapRouter;
    // address private constant UNISWAP_V2_ROUTER =
    //   0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  constructor() public payable {
        uniswapRouter = IUniswapV2Router02(UNISWAP_V2_ROUTER);
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
      uniswapRouter.getAmountsOut(_amountIn, path);

    uint _amountOutMin = amountOutMins[path.length - 1];
    uniswapRouter.swapExactTokensForTokens(
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
      uniswapRouter.getAmountsOut(_amountIn, path);

    return amountOutMins[path.length - 1];
  }

  function swapFromETHToToken(
    address tokenOut, //token trading out
    uint256 amountIn
    // uint256 amountOutMin, //min of token we want trade out
    // address to
     ) external payable{
        address[] memory path;
        path = new address[](2);
        path[0]= uniswapRouter.WETH();
        path[1]=tokenOut;

        uint amountOutMin = uniswapRouter.getAmountsOut(amountIn, path)[1];
        uniswapRouter.swapExactETHForTokens{value: msg.value}(amountOutMin,path,msg.sender,block.timestamp);
    }

  function swapFromTokenToETH(
    address tokenIn,
    uint256 amountIn
    // uint256 amountOutMin,
    // address to
    ) external{
      
        IERC20(tokenIn).transferFrom(msg.sender,address(this),amountIn);
        IERC20(tokenIn).approve(UNISWAP_V2_ROUTER,amountIn);
        address[] memory path;
          path = new address[](2);
          path[0] = tokenIn;
          path[1] = uniswapRouter.WETH();
          
           uint amountOutMin = uniswapRouter.getAmountsOut(amountIn, path)[1];
    uniswapRouter.swapExactTokensForETH(amountIn,amountOutMin,path, msg.sender, block.timestamp);
        }
}