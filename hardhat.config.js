import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

//0x10127BE7f11B9471AA8F7CB10186581FF0d42398

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks : {
    sepolia : {
      url: process.env.ALCHEMY_API,
      accounts: [process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY: '']
    }
  }
};

export default config;
