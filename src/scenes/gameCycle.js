// gameCycle.js

// Import the gameData object
import gameData from './gameData.js'; // Update the path accordingly

// Function to initialize the game state
export function initializeGameState(gameData) {
    // Update maxDay with the length of the days array in gameData
    gameData.gameState = {
        currentDay: 1,
        maxDay: gameData.gameData.days.length, // Set the maxDay dynamically based on the dataset
        selected: [],
        history: [],
    };
}

// Function to go to the next day
export function goToNextDay(gameData) {
    // Add the current day's selected data to the history
    gameData.gameState.history.push({ selected: [...gameData.gameState.selected] });

    // Clear the selected data for the next day
    gameData.gameState.selected = [];

    // Increment the current day
    gameData.gameState.currentDay += 1;

    // Check if the current day exceeds the maximum day
    if (gameData.gameState.currentDay > gameData.gameState.maxDay) {
        console.log('Game over! No more days left.');
        // Handle end of the game here
    }
}
