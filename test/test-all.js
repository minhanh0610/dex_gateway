
const BN = require("bn.js");

const IERC20 = artifacts.require("IERC20"); // artifacts is created in build/contracts
const TestUniswap = artifacts.require("TestUniswap");

contract("TestUniswap", (accounts) => {
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC"; // wallet
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
    const BUSD = "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

    const BNB = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52";
    const WBNB = "0x418D75f65a02b3D53B2418FB8E1fe493759c7605";

  const WHALE = DAI_WHALE;
  const AMOUNT_IN = 100000;
  const AMOUNT_OUT_MIN = 1;
  const TOKEN_IN = DAI;
  const TOKEN_OUT = BUSD;
  //const TOKEN_OUT = WBNB;
  const TO = accounts[0];
  console.log(TO);

let testUniswap;
let tokenIn;
let tokenOut;
let usdc;

beforeEach(async () => {
  tokenIn = await IERC20.at(TOKEN_IN);
  tokenOut = await IERC20.at(TOKEN_OUT);

  usdc = await IERC20.at(USDC);


  testUniswap = await TestUniswap.new();

  //console.log({testUniswap});
  

  //await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });

});
it("should pass", async () => {
    console.log(`out ${await tokenOut.balanceOf(TO)}`);
   const ethAmount = 1000;
    await testUniswap.swapTokenforEth(
        tokenOut.address,
        ethAmount
    )

    console.log(`out ${await tokenOut.balanceOf(TO)}`);
  });
});

