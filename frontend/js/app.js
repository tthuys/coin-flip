// document.getElementById('flip-button').addEventListener('click', async function() {
//     const apiKey = 'zpka_eed94d43a9264c51a01ec7f5a114682e_77e580ec';
    
//     try {
//         // Dummy data for testing
//         const data = {
//             current_block_hash: "00000000000000000008bbbe78e77a8e97316c9bff73a3f8209eb1a3bb3caa5a"
//         };

//         console.log('Using Dummy Data:', data);

//         const blockHash = data.current_block_hash;
//         console.log('Block Hash:', blockHash);

//         const randomHex = blockHash.slice(-1);
//         console.log('Random Hex Character:', randomHex);

//         const randomNumber = parseInt(randomHex, 16);
//         console.log('Random Number:', randomNumber);

//         const isHeads = randomNumber % 2 === 0;
//         console.log('Is Heads:', isHeads);

//         const coin = document.querySelector('.coin');
//         const resultDiv = document.getElementById('result');

//         if (isHeads) {
//             coin.classList.add('heads-flip');
//             coin.classList.remove('tails-flip');
//             resultDiv.innerText = 'Result: Heads';
//         } else {
//             coin.classList.add('tails-flip');
//             coin.classList.remove('heads-flip');
//             resultDiv.innerText = 'Result: Tails';
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         document.getElementById('result').innerText = 'An unexpected error occurred';
//     }
// });


document.getElementById('flip-button').addEventListener('click', async function() {
    const apiKey = 'zpka_eed94d43a9264c51a01ec7f5a114682e_77e580ec';
    
    try {
        const response = await fetch('https://svc.blockdaemon.com/universal/v1/bitcoin/mainnet/', {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);

            // Use the block hash as a source of randomness
            const blockHash = data.current_block_hash;
            console.log('Block Hash:', blockHash);

            const randomHex = blockHash.slice(-1); // Take the last hex character
            console.log('Random Hex Character:', randomHex);

            const randomNumber = parseInt(randomHex, 16); // Convert hex to number
            console.log('Random Number:', randomNumber);

            const isHeads = randomNumber % 2 === 0;  // Even number -> Heads, Odd number -> Tails
            console.log('Is Heads:', isHeads);

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
        } else {
            console.error('Error fetching data from blockchain API', response.status, response.statusText);
            document.getElementById('result').innerText = 'Error fetching data from blockchain API';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'An unexpected error occurred';
    }
});
