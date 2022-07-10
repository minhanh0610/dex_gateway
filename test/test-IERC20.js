
const BN = require("bn.js");

const IERC20 = artifacts.require("IERC20");

contract("IERC20", (account) =>{
  
    const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const BNB_WHALE = "0xe2fc31F816A9b94326492132018C3aEcC4a93aE1";

    it("get BNB Balance", async()=>{
        const bnbAddr = await IERC20.at(WBNB);
        const balance = await bnbAddr.balanceOf(BNB_WHALE);
        console.log(`${balance}`);
    });

    it("tranfer BNB to ganache wallet", async()=>{
        const bnbAddr = await IERC20.at(WBNB);
        const balance = await bnbAddr.balanceOf(BNB_WHALE);

        await bnbAddr.transfer(account[0], balance, {from: BNB_WHALE});
        console.log(`${balance}`);
    })

})