document.getElementById("flipButton").addEventListener("click", function () {
	const coin = document.getElementById("coin");
	const result = document.getElementById("result");

	// Generate random result (Heads or Tails)
	const random = Math.random();
	const isHeads = random < 0.5;

	// Add animation class to coin based on result
	coin.style.transform = isHeads ? "rotateY(0deg)" : "rotateY(180deg)";

	// Display result after the animation
	setTimeout(() => {
		result.textContent = isHeads ? "It's Heads!" : "It's Tails!";
	}, 2000); // Match the CSS transition time (2s)
});
