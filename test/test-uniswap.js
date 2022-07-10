
const BN = require("bn.js");

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

    const BNB = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    const WBNB = "0x418D75f65a02b3D53B2418FB8E1fe493759c7605";

  const WHALE = DAI_WHALE;
  const AMOUNT_IN = 1000000;
  const AMOUNT_OUT_MIN = 1;
  const TOKEN_IN = DAI;
  const TOKEN_OUT = BUSD;
  //const TOKEN_OUT = WBNB;
  const TO = accounts[0];
  console.log(TO);

let testUniswap;
let tokenIn;
let tokenOut;

// beforeEach(async () => {
//   tokenIn = await IERC20.at(TOKEN_IN);
//   tokenOut = await IERC20.at(TOKEN_OUT);
//   testUniswap = await TestUniswap.new();

//   //console.log({testUniswap});

//   // make sure WHALE has enough ETH to send tx
//   // await sendEther(web3, accounts[0], WHALE, 1);
//   // var accounts = await web3.eth.getAccounts();
//   // console.log({accounts});
//   await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: TO });
// });



// it("swap token to token", async () => {
//   console.log(`out ${await tokenOut.balanceOf(TO)}`);
//   console.log(`out ${await tokenIn.balanceOf(TO)}`);


//   let amountOutIn = await testUniswap.getAmountOutMin(
//     tokenIn.address,
//     tokenOut.address,
//     AMOUNT_IN
//   );
//   console.log({AMOUNT_IN});
//   console.log(amountOutIn.toNumber());
//   let AMOUNT_OUT_MIN = amountOutIn.toNumber();
//   //AMOUNT_OUT_MIN = amountOutIn;

//   await testUniswap.swap(
//     tokenIn.address,
//     tokenOut.address,
//     AMOUNT_IN,
//     AMOUNT_OUT_MIN,
//     TO,
//     {
//       from: TO,
//     }
//   );

//   console.log(`in ${AMOUNT_IN}`);
//   console.log(`out ${await tokenOut.balanceOf(TO)}`);
//   console.log(`in ${await tokenIn.balanceOf(TO)}`);

// });

// let eth_token = DAI
// it("eth to token",async()=>{
//   eth_token = await IERC20.at(eth_token); 
//   console.log(`out ${await tokenOut.balanceOf(TO)}`);
//   let testUniswap = await TestUniswap.new();
//  await testUniswap.swapFromETHToToken(eth_token.address,AMOUNT_OUT_MIN,TO,{value:AMOUNT_IN, FROM:TO});
//  //await testUniswap.swapFromETHToToken(tokenOut.address,AMOUNT_OUT_MIN,TO);
//  console.log(`in ${AMOUNT_IN}`, WHALE);
//   console.log(`out ${await tokenOut.balanceOf(TO)}`);
//   //console.log(TO.balanceOf());
// });

let token_eth = DAI
it("token to eth",async()=>{
  token_eth = await IERC20.at(token_eth);
  testUniswap = await TestUniswap.new();
  console.log(`in ${await token_eth.balanceOf(TO)}`,AMOUNT_IN);
  await token_eth.approve(testUniswap.address, AMOUNT_IN, { from: TO });

   await testUniswap.swapFromTokenToETH(
    token_eth.address,
     AMOUNT_IN,
     AMOUNT_OUT_MIN,
     TO,
     {
      from: TO,
     }
   );

   console.log(`out ${await token_eth.balanceOf(TO)}`);
 })
 

});
