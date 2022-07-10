
const BN = require("bn.js");

const IERC20 = artifacts.require("IERC20");
const TestPancake = artifacts.require("TestPancake");

contract("TestPancake", (accounts) => {
    const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const DAI_WHALE = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
    const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
    const BUSD = "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
    const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

  const WHALE = DAI_WHALE;
  const AMOUNT_IN = 100000;
  const AMOUNT_OUT_MIN = 1;
  const TOKEN_IN = WBNB;
  const TOKEN_OUT = WETH;
  const TO = accounts[0];

let tokenin_addr = TOKEN_IN;
let tokenout_addr = TOKEN_OUT;
let testPancake;
let tokenIn;
let tokenOut;
// beforeEach(async () => {
//   tokenIn = await IERC20.at(TOKEN_IN);
//   tokenOut = await IERC20.at(TOKEN_OUT);
//   testPancake = await TestPancake.new();

//   // make sure WHALE has enough ETH to send tx
//   // await sendEther(web3, accounts[0], WHALE, 1);
//   await tokenIn.approve(testUniswap.address, AMOUNT_IN, { from: WHALE });
// });

it("should pass", async () => {
  testPancake = await TestPancake.new();
  await testPancake.swap(
    tokenin_addr,
    tokenout_addr,
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
});
