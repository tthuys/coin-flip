const { ethers, network } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const VRFExample = await ethers.getContractFactory("VRFExample");
    const vrfCoordinator = "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B";
    const keyHash = "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae";
    const subscriptionId = 1;

    const vrfExample = await VRFExample.deploy(vrfCoordinator, keyHash, subscriptionId);
    console.log("VRFExample deployed to:", vrfExample.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
