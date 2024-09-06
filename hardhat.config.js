require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    // Configure other networks here if needed
  },
  etherscan: {
    // Your API key for etherscan if you want to verify contracts
    apiKey: "YOUR_ETHERSCAN_API_KEY"
  }
};
