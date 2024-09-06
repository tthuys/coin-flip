async function main() {
	const [deployer] = await ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);

	const CoinFlip = await ethers.getContractFactory("CoinFlip");
	const coinFlip = await CoinFlip.deploy(
		"67290033934515025777456143001470391964895190346375434393344356362633963775246", // Subscription ID as a string
		"0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06", // vrfCoordinator
		"0xcaf3c3727e033261d383b315559476f48034c13b18f8cafed4d871abe5049186" // keyHash
	);

	console.log("CoinFlip deployed to:", coinFlip.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
