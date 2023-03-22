require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "ganache",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  },
  solidity:{
    compilers: [
      {
        version: "0.5.16",
      },
    ],
  }
};