const words = ["python", "apple", "banana", "laptop", "coding"];

let word;
let guessedLetters;
let attempts;

const hangmanStages = [
``,
`
 O
`,
`
 O
 |
`,
`
 O
/|
`,
`
 O
/|\\
`,
`
 O
/|\\
/
`,
`
 O
/|\\
/ \\
`
];

function startGame() {
    word = words[Math.floor(Math.random() * words.length)];

    guessedLetters = [];
    attempts = 6;

    document.getElementById("attempts").textContent = attempts;
    document.getElementById("message").textContent = "";
    document.getElementById("hangman").textContent = hangmanStages[0];

    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessInput").value = "";

    displayWord();
}

function displayWord() {
    let display = "";

    for (let letter of word) {
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    document.getElementById("word").textContent = display;

    if (!display.includes("_")) {
        document.getElementById("message").textContent =
            "🎉 Congratulations! You Won!";

        document.getElementById("guessInput").disabled = true;
    }
}

function checkGuess() {
    if (attempts === 0) return;

    const input = document.getElementById("guessInput");
    const guess = input.value.toLowerCase();

    input.value = "";

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        document.getElementById("message").textContent =
            "⚠️ Please enter a valid letter.";
        return;
    }

    if (guessedLetters.includes(guess)) {
        document.getElementById("message").textContent =
            "⚠️ You already guessed that letter.";
        return;
    }

    guessedLetters.push(guess);

    if (word.includes(guess)) {
        document.getElementById("message").textContent =
            "✅ Correct Guess!";
    } else {
        attempts--;

        document.getElementById("attempts").textContent = attempts;

        document.getElementById("hangman").textContent =
            hangmanStages[6 - attempts];

        document.getElementById("message").textContent =
            "❌ Wrong Guess!";

        if (attempts === 0) {
            document.getElementById("message").textContent =
                `💀 Game Over! The word was "${word}"`;

            document.getElementById("word").textContent = word;

            document.getElementById("guessInput").disabled = true;
        }
    }

    displayWord();
}

function restartGame() {
    startGame();
}

document.getElementById("guessInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkGuess();
    }
});

startGame();