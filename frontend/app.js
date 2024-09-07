const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
	"function flipCoin() public returns (bytes32)",
	"function getResult() public view returns (uint8)",
];

async function flipCoin() {
	const contract = new ethers.Contract(contractAddress, abi, signer);
	try {
		const tx = await contract.flipCoin();
		await tx.wait();
		const result = await contract.getResult();
		document.getElementById("result").innerText =
			result === 0 ? "Heads" : "Tails";
	} catch (err) {
		console.error("Error flipping the coin:", err);
	}
}

document.getElementById("flipButton").addEventListener("click", flipCoin);
