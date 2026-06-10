import random

# List of predefined words
words = ["python", "apple", "banana", "laptop", "coding"]

print("🎮 Welcome to Hangman!")
print("Guess the word one letter at a time.")

while True:
    # Select a random word
    word = random.choice(words)

    # Store guessed letters
    guessed_letters = []

    # Number of incorrect guesses allowed
    attempts = 6

    while attempts > 0:
        display_word = ""

        # Display guessed letters and underscores
        for letter in word:
            if letter in guessed_letters:
                display_word += letter + " "
            else:
                display_word += "_ "

        print("\nWord:", display_word)

        # Check if the player has guessed the word
        if "_" not in display_word:
            print("🎉 Congratulations! You guessed the word:", word)
            break

        guess = input("Enter a letter: ").lower()

        # Check for valid input
        if len(guess) != 1 or not guess.isalpha():
            print("❌ Please enter a single alphabet.")
            continue

        # Check if already guessed
        if guess in guessed_letters:
            print("⚠️ You already guessed that letter.")
            continue

        guessed_letters.append(guess)

        if guess in word:
            print("✅ Correct guess!")
        else:
            attempts -= 1
            print("❌ Wrong guess!")
            print("Attempts left:", attempts)

    else:
        print("\n💀 Game Over!")
        print("The word was:", word)

    play_again = input("\nDo you want to play again? (yes/no): ").lower()
    if play_again != "yes":
        print("Thanks for playing!")
        break