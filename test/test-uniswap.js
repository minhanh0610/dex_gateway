
const BN = require("bn.js");
//var BN = web3.utils.BN;


const IERC20 = artifacts.require("IERC20"); // artifacts is created in build/contracts
const TestUniswap = artifacts.require("TestUniswap");

contract("TestUniswap", (accounts) => {
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC"; // wallet
    const ETH_WHALE="0x5305C924f079fB33B2de487005899A44b24849E3";

    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
    const BUSD = "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const ETH = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    const BNB = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    const WBNB = "0x418D75f65a02b3D53B2418FB8E1fe493759c7605";

  const WHALE = DAI_WHALE;

  const TO = accounts[0];
  console.log(`account ${TO}`);

let testUniswap;
let tokenIn;
let tokenOut;
let tokenIn_decimals;
let tokenOut_decimals;

//swap 2 token 
const TOKEN_IN = USDC;
const TOKEN_OUT = USDT;
const AMOUNT_IN = 1;

beforeEach(async () => {
  tokenIn = await IERC20.at(TOKEN_IN);
  tokenOut = await IERC20.at(TOKEN_OUT);
  testUniswap = await TestUniswap.new();

    //decimal of token
  let decimals = await tokenIn.decimals();
  tokenIn_decimals = decimals.toNumber();
  console.log(tokenIn_decimals);
  decimals = await tokenOut.decimals();
  tokenOut_decimals = decimals.toNumber();
  console.log(tokenOut_decimals);

  let _amountIn = AMOUNT_IN;
  //convert amountIn toWei
  let amountIn = web3.utils.toWei(web3.utils.toBN(_amountIn * Math.pow(10, tokenIn_decimals)), 'wei');

  // var amountIn = web3.utils.toWei(
  //   web3.utils.toBN(_amountIn), // converts Number to BN, which is accepted by `toWei()`
  //   'ether'
  // );
  await tokenIn.approve(testUniswap.address, amountIn, { from: TO });
});


it("swap token to token", async () => {
  console.log(`before swap : token in ${await tokenIn.balanceOf(TO)}   ${await tokenIn.balanceOf(TO) / Math.pow(10, tokenIn_decimals)}`);
  console.log(`before swap : token out ${await tokenOut.balanceOf(TO)}    ${await tokenOut.balanceOf(TO) / Math.pow(10, tokenOut_decimals)}`);
  
  let _amountIn = AMOUNT_IN;
  //convert amountIn toWei
  let amountIn = web3.utils.toWei(web3.utils.toBN(_amountIn * Math.pow(10, tokenIn_decimals)), 'wei');
  // var amountIn = web3.utils.toWei(
  //     web3.utils.toBN(_amountIn), // converts Number to BN, which is accepted by `toWei()`
  //     'ether'
  //   );

  let amountOutIn = await testUniswap.getAmountOutMin(
    tokenIn.address,
    tokenOut.address,
    amountIn
  );
  console.log(amountIn.toString());
  console.log(amountOutIn.toString());
  // let AMOUNT_OUT_MIN = amountOutIn.toNumber();
  //AMOUNT_OUT_MIN = amountOutIn;

  //swap
  await testUniswap.swap(
    tokenIn.address,
    tokenOut.address,
    amountIn,
    TO,
    {
      from: TO,
    }
  );

  console.log(`after swap(wei)  : token in ${await tokenIn.balanceOf(TO)}   ${await tokenIn.balanceOf(TO) / Math.pow(10, tokenIn_decimals)}`);
  //console.log(`after swap(token): token in ${await tokenIn.balanceOf(TO) / Math.pow(10, tokenIn_decimals)}`);
  console.log(`after swap(wei)  : token out ${await tokenOut.balanceOf(TO)}   ${await tokenOut.balanceOf(TO) / Math.pow(10, tokenOut_decimals)}`);
 //console.log(`after swap(token): token out ${await tokenIn.balanceOf(TO) / Math.pow(10, tokenOut_decimals)}`);

});


// it("eth to token",async()=>{
//   let eth_token =DAI
//   eth_token = await IERC20.at(eth_token); 
//   let testUniswap = await TestUniswap.new();

//   //decimal of token 
//   let decimals = await eth_token.decimals();
//   let token_decimals = decimals.toNumber();
//   console.log(`decimal of token ${decimals.toNumber()}`);

//   console.log(`before swap (wei) ${await eth_token.balanceOf(TO)}`);
//   console.log(`before swap (token) ${await eth_token.balanceOf(TO) / Math.pow(10, token_decimals)}`);
  
//   //amountIn
//   let _amountIn = 200;
//   //convert amountIn toWei
//   var amountIn = web3.utils.toWei(
//     web3.utils.toBN(_amountIn), // converts Number to BN, which is accepted by `toWei()`
//     'ether'
//     );

//   //swap
//  await testUniswap.swapFromETHToToken(
//     eth_token.address,  
//     amountIn,
//     {value:amountIn, FROM:TO}
//   );
 
//   console.log(`after swap (wei) ${await eth_token.balanceOf(TO)}`);
//   console.log(`after swap (token) ${await eth_token.balanceOf(TO) / Math.pow(10, token_decimals)}`);
// });


// let token_eth = DAI
// it("token to eth",async()=>{
//   let token_eth = DAI
//   token_eth = await IERC20.at(token_eth);
//   testUniswap = await TestUniswap.new();

//   //decimal of token
//   let decimals = await token_eth.decimals();
//   let token_decimals = decimals.toNumber();
//   console.log(`decimal of token ${decimals.toNumber()}`);

//   console.log(`before swap (wei) ${await token_eth.balanceOf(TO)}`);
//   console.log(`before swap (token) ${await token_eth.balanceOf(TO) / Math.pow(10, token_decimals)}`);

//   //amountIn
//   let _amountIn = 1000;
//   //convert amountIn toWei
//     var amountIn = web3.utils.toWei(
//       web3.utils.toBN(_amountIn), // converts Number to BN, which is accepted by `toWei()`
//       'ether'
//     );
  
//   //approve
//   await token_eth.approve(testUniswap.address, amountIn, { from: TO });

//   //swap
//    await testUniswap.swapFromTokenToETH(
//       token_eth.address,
//       amountIn,
//       {
//         from: TO,
//       }
//    );
 
//   console.log(`after swap (wei) ${await token_eth.balanceOf(TO)}`);
//   console.log(`after swap (token) ${await token_eth.balanceOf(TO) / Math.pow(10, token_decimals)}`);

//  })
 

});
