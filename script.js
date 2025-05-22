document.addEventListener('DOMContentLoaded', () => {
    const gameListItems = document.querySelectorAll('#game-list-pane li');
    const gameViewPane = document.getElementById('game-view-pane');

    const gamePlaceholders = {
        hangman: {
            title: "Hangman",
            description: "Guess the letters to find the hidden word. You have a limited number of incorrect guesses!"
        },
        scramble: {
            title: "Word Scramble",
            description: "Unscramble the letters to form a valid word. How many can you find?"
        },
        crossword: {
            title: "Crossword",
            description: "Fill in the words into the grid based on the given clues. Test your vocabulary!"
        }
    };

    gameListItems.forEach(item => {
        item.addEventListener('click', () => {
            const gameKey = item.getAttribute('data-game');
            const gameData = gamePlaceholders[gameKey];

            if (gameData) {
                gameViewPane.innerHTML = `
                    <h1>${gameData.title}</h1>
                    <p>${gameData.description}</p>
                    <p><em>(Full game implementation coming soon!)</em></p>
                `;
            } else {
                gameViewPane.innerHTML = '<p>Select a game from the left to start playing!</p>';
            }
        });
    });
});
