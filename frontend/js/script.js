document.getElementById('flip-button').addEventListener('click', function() {
    const coin = document.querySelector('.coin');
    const result = document.getElementById('result');
    
    coin.style.transition = 'transform 1s ease-in-out';
    coin.style.transform = 'rotateY(1800deg)'; // Rotate the coin multiple times
    
    setTimeout(() => {
        const isHeads = Math.random() > 0.5;
        coin.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';
        result.textContent = isHeads ? 'You got Heads!' : 'You got Tails!';
    }, 2000);
});
