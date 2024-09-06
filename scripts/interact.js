document.getElementById('flip-button').addEventListener('click', async function() {
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [
        // ABI details from your deployed contract
    ];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        const tx = await contract.requestRandomWords();
        await tx.wait();

        const result = await contract.getResult();
        const isHeads = result === 0;

        const coin = document.querySelector('.coin');
        const resultDiv = document.getElementById('result');

        if (isHeads) {
            coin.classList.add('heads-flip');
            coin.classList.remove('tails-flip');
            resultDiv.innerText = 'Result: Heads';
        } else {
            coin.classList.add('tails-flip');
            coin.classList.remove('heads-flip');
            resultDiv.innerText = 'Result: Tails';
        }
    } catch (error) {
        console.error('Error interacting with contract:', error);
        document.getElementById('result').innerText = 'Error interacting with contract';
    }
});
