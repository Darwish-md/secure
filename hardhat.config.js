require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    // ganache: {
    //   url: "http://localhost:7545",
    //   chainId: 1337
    // }
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${oYhM6uiApE-Yf5Tx31MPjmW5aWZLzQTy}`,
    //   accounts: [`0x${rinkebyPrivateKey}`],
    // },
  },
  solidity:{
    compilers: [
      {
        version: "0.8.0",
      },
    ],
  }
};