require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const TESTNET_RPC = process.env.MUMBAI_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGAONSCAN_API_KEY = process.env.POLYGAONSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    mumbai: {
      url: TESTNET_RPC,
      accounts:[PRIVATE_KEY]
    },
  },
  etherscan:{
    apiKey: POLYGAONSCAN_API_KEY,
  }
};
