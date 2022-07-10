const Web3 = require('web3');
  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/711a4f11887a49efafcaec807b0f2ee0');
  const web3 = new Web3(provider);
  const TO = "0x60417Db636e1c50202dbFd212f0439c951BBA742";

  web3.eth.getBalance(TO).then(balance => console.log(balance));