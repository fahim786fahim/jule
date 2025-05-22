const hangmanWords = ["javascript", "html", "developer", "coding", "browser", "network", "element", "style", "attribute"];
const scrambleWords = ["react", "angular", "vue", "python", "style", "script", "world", "computer", "keyboard"];

document.addEventListener('DOMContentLoaded', () => {
    const gameListItems = document.querySelectorAll('#game-list-pane li');
    const gameViewPane = document.getElementById('game-view-pane');

    const gamePlaceholders = {
        hangman: {
            title: "Hangman",
            init: function(gameViewPane) {
                gameViewPane.innerHTML = `
                    <h2>Hangman</h2>
                    <div id="hangman-game">
                        <div id="word-display"></div>
                        <div id="guesses-remaining">Attempts remaining: 6</div>
                        <div id="guessed-letters">Guessed letters: </div>
                        <input type="text" id="letter-input" maxlength="1" placeholder="Guess a letter">
                        <button id="guess-button">Guess</button>
                        <button id="reset-hangman-button">New Word</button>
                        <div id="hangman-message"></div>
                    </div>
                `;

                let selectedWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
                let guessedWord = Array(selectedWord.length).fill('_');
                let remainingAttempts = 6;
                let incorrectGuesses = [];

                const wordDisplay = document.getElementById('word-display');
                const guessesRemainingDisplay = document.getElementById('guesses-remaining');
                const guessedLettersDisplay = document.getElementById('guessed-letters');
                const letterInput = document.getElementById('letter-input');
                const guessButton = document.getElementById('guess-button');
                const resetHangmanButton = document.getElementById('reset-hangman-button');
                const hangmanMessage = document.getElementById('hangman-message');

                function updateDisplay() {
                    wordDisplay.textContent = guessedWord.join(' ');
                    guessesRemainingDisplay.textContent = `Attempts remaining: ${remainingAttempts}`;
                    guessedLettersDisplay.textContent = `Guessed letters: ${incorrectGuesses.join(', ')}`;
                    letterInput.value = '';
                }

                function checkGuess(letter) {
                    letter = letter.toLowerCase();
                    if (!letter.match(/[a-z]/i)) {
                        hangmanMessage.textContent = "Please enter a valid letter.";
                        return;
                    }
                    hangmanMessage.textContent = ""; // Clear previous message

                    if (selectedWord.includes(letter)) {
                        if (!guessedWord.includes(letter)) {
                            for (let i = 0; i < selectedWord.length; i++) {
                                if (selectedWord[i] === letter) {
                                    guessedWord[i] = letter;
                                }
                            }
                        } else {
                            hangmanMessage.textContent = "You already guessed that letter.";
                            hangmanMessage.className = ''; // Ensure this is set
                        }
                    } else {
                        if (!incorrectGuesses.includes(letter)) {
                            incorrectGuesses.push(letter);
                            remainingAttempts--;
                        } else {
                            hangmanMessage.textContent = "You already tried that incorrect letter.";
                            hangmanMessage.className = ''; // Ensure this is set
                        }
                    }
                    updateDisplay();
                    checkGameStatus();
                }

                function checkGameStatus() {
                    if (guessedWord.join('') === selectedWord) {
                        hangmanMessage.textContent = "Congratulations! You guessed the word!";
                        hangmanMessage.className = 'success'; // Add this line
                        disableGameControls();
                    } else if (remainingAttempts <= 0) {
                        hangmanMessage.textContent = `Game Over! The word was: ${selectedWord}`;
                        hangmanMessage.className = ''; // Ensure no success class
                        disableGameControls();
                    } else {
                        hangmanMessage.className = ''; // Clear class if game is ongoing
                    }
                }
                
                function disableGameControls() {
                    letterInput.disabled = true;
                    guessButton.disabled = true;
                }

                function resetGame() {
                    selectedWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
                    guessedWord = Array(selectedWord.length).fill('_');
                    remainingAttempts = 6;
                    incorrectGuesses = [];
                    hangmanMessage.textContent = "";
                    hangmanMessage.className = ''; // Add this line
                    letterInput.disabled = false;
                    guessButton.disabled = false;
                    updateDisplay();
                }
                
                guessButton.addEventListener('click', () => {
                    const letter = letterInput.value;
                    if (letter) {
                        checkGuess(letter);
                    }
                });

                letterInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        const letter = letterInput.value;
                        if (letter) {
                            checkGuess(letter);
                        }
                    }
                });
                
                resetHangmanButton.addEventListener('click', resetGame);

                // Initial setup
                resetGame(); // Call reset to select a word and set up the display
            }
        },
        scramble: {
            title: "Word Scramble",
            init: function(gameViewPane) {
                gameViewPane.innerHTML = `
                    <h2>Word Scramble</h2>
                    <div id="scramble-game">
                        <div id="scrambled-word-display"></div>
                        <input type="text" id="scramble-guess-input" placeholder="Your guess">
                        <button id="scramble-guess-button">Guess</button>
                        <button id="new-scramble-button">New Word</button>
                        <div id="scramble-message"></div>
                    </div>
                `;

                let originalWord = '';
                let scrambledWord = '';

                const scrambledWordDisplay = document.getElementById('scrambled-word-display');
                const guessInput = document.getElementById('scramble-guess-input');
                const guessButton = document.getElementById('scramble-guess-button');
                const newWordButton = document.getElementById('new-scramble-button');
                const scrambleMessage = document.getElementById('scramble-message');

                function scrambleWord(word) {
                    let arr = word.split('');
                    for (let i = arr.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
                    }
                    // Ensure the scrambled word is different from the original
                    if (arr.join('') === word) {
                        return scrambleWord(word); // Rescramble if it's the same
                    }
                    return arr.join('');
                }

                function startNewGame() {
                    originalWord = scrambleWords[Math.floor(Math.random() * scrambleWords.length)];
                    scrambledWord = scrambleWord(originalWord);
                    
                    scrambledWordDisplay.textContent = scrambledWord;
                    scrambleMessage.textContent = '';
                    scrambleMessage.className = ''; // Clear any previous classes
                    guessInput.value = '';
                    guessInput.disabled = false;
                    guessButton.disabled = false;
                }

                function checkGuess() {
                    const userGuess = guessInput.value.toLowerCase();
                    if (!userGuess) {
                        scrambleMessage.textContent = "Please enter a guess.";
                        scrambleMessage.className = '';
                        return;
                    }

                    if (userGuess === originalWord) {
                        scrambleMessage.textContent = "Correct! Well done!";
                        scrambleMessage.className = 'success';
                        guessInput.disabled = true;
                        guessButton.disabled = true;
                    } else {
                        scrambleMessage.textContent = "Incorrect. Try again!";
                        scrambleMessage.className = 'error'; // You might want to add a .error CSS class
                    }
                }

                guessButton.addEventListener('click', checkGuess);
                guessInput.addEventListener('keypress', (event) => {
                    if (event.key === 'Enter') {
                        checkGuess();
                    }
                });
                newWordButton.addEventListener('click', startNewGame);

                // Initial setup
                startNewGame();
            }
        },
        crossword: {
            title: "Crossword",
            init: function(gameViewPane) {
                gameViewPane.innerHTML = `
                    <h2>Crossword</h2>
                    <div id="crossword-placeholder" style="text-align: center; padding: 20px;">
                        <img src="https://via.placeholder.com/300x200.png?text=Crossword+Grid+Preview" alt="Crossword Puzzle Placeholder Image" style="max-width: 100%; border: 1px solid #ccc; margin-bottom: 20px;">
                        <h3>Coming Soon!</h3>
                        <p>The Crossword game is currently under development.</p>
                        <p>This game will challenge your vocabulary and general knowledge with a variety of themed puzzles. Stay tuned for updates!</p>
                        <p><strong>Features planned:</strong></p>
                        <ul style="list-style-type: disc; padding-left: 40px; text-align: left; display: inline-block;">
                            <li>Interactive grid</li>
                            <li>Across and Down clues</li>
                            <li>Progress saving (hopefully!)</li>
                            <li>Multiple puzzle difficulties</li>
                        </ul>
                    </div>
                `;
            }
        }
    };

    gameListItems.forEach(item => {
        item.addEventListener('click', () => {
            const gameKey = item.getAttribute('data-game');
            const gameData = gamePlaceholders[gameKey];

            if (gameData) {
                if (typeof gameData.init === 'function') {
                    gameData.init(gameViewPane); // Call the init function
                } else { // Fallback for old structure or other games not yet implemented
                    gameViewPane.innerHTML = `
                        <h1>${gameData.title}</h1>
                        <p>${gameData.description}</p>
                        <p><em>(Full game implementation coming soon!)</em></p>
                    `;
                }
            } else {
                gameViewPane.innerHTML = '<p>Select a game from the left to start playing!</p>';
            }
        });
    });
});
