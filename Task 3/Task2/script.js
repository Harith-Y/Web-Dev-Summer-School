const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document
  .getElementById("guessForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const userGuess = parseInt(document.getElementById("userGuess").value);
    attempts++;
    giveFeedback(userGuess);
  });

function giveFeedback(guess) {
  const feedback = document.getElementById("feedback");
  if (guess === targetNumber) {
    feedback.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
    feedback.style.color = "green";
  } else if (guess < targetNumber) {
    feedback.textContent = "Your guess is too low. Try again!";
    feedback.style.color = "red";
  } else {
    feedback.textContent = "Your guess is too high. Try again!";
    feedback.style.color = "red";
  }
}
