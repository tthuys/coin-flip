require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
	solidity: "0.8.7",
	networks: {
		sepolia: {
			url: "https://mainnet.infura.io/v3/90262a19db354eeaaa03439d320c9cf3", // Replace with your Infura or Alchemy URL
			accounts: [
				"ee476dac1e06f091c5150f41d972d05feeb77c328a6494b3b31d9419d464c3a9",
			], // Replace with your private key
		},
		goerli: {
			url: "https://mainnet.infura.io/v3/90262a19db354eeaaa03439d320c9cf3", // Replace with your Infura or Alchemy URL
			accounts: [
				"ee476dac1e06f091c5150f41d972d05feeb77c328a6494b3b31d9419d464c3a9",
			], // Replace with your private key
		},
	},
};
