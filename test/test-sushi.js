
const BN = require("bn.js");

const IERC20 = artifacts.require("IERC20");
const TestSushi = artifacts.require("TestSushi");

contract("TestSushi", (accounts) => {
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
    const BUSD = "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

    const SUSHI = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";

  const WHALE = DAI_WHALE;
  const AMOUNT_IN = 100000;
  const AMOUNT_OUT_MIN = 1;
  const TOKEN_IN = WBTC;
  //const TOKEN_IN = USDC;
  const TOKEN_OUT = DAI;
  const TO = accounts[0];


let testSushi;
let tokenIn;
let tokenOut;
beforeEach(async () => {
  tokenIn = await IERC20.at(TOKEN_IN);
  tokenOut = await IERC20.at(TOKEN_OUT);
  testSushi = await TestSushi.new();

  // make sure WHALE has enough ETH to send tx
  // await sendEther(web3, accounts[0], WHALE, 1);
  await tokenIn.approve(testSushi.address, AMOUNT_IN, { from: WHALE });
});

it("should pass", async () => {
  console.log(`out ${await tokenOut.balanceOf(TO)}`);
  await testSushi.swap(
    tokenIn.address,
    tokenOut.address,
    AMOUNT_IN,
    AMOUNT_OUT_MIN,
    TO,
    {
      from: WHALE,
    }
  );


  console.log(`in ${AMOUNT_IN}`);
  console.log(`out ${await tokenOut.balanceOf(TO)}`);
});

// it("should getAmountIn", async () => {
//   let x = await testUniswap.getAmountOutMin(tokenIn.address,tokenOut.address,AMOUNT_IN);


//   console.log(x);

// });
});
