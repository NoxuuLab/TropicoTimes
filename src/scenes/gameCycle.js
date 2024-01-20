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
        graphData: generateGraphData()
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


// Function to open the popup message
export function openPopup(scene, message) {
    // Create a text object for the popup message
    const messagePopup = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY, message, {
      fontSize: '24px',
      fill: '#fff',
      backgroundColor: '#000',
      padding: {
        x: 20,
        y: 10
      },
      wordWrap: { width: 600 }
    })
    .setOrigin(0.5)
    .setInteractive();
  
    // Optionally, add a rectangle behind the text to act as a modal background
    const background = scene.add.rectangle(scene.cameras.main.centerX, scene.cameras.main.centerY, scene.cameras.main.width, scene.cameras.main.height, 0x000000, 0.5)
      .setOrigin(0.5)
      .setInteractive();
  
    // Bring the popup to the top
    scene.children.bringToTop(messagePopup);
  
    // Add a 'close' listener to the background to hide the popup when clicked
    background.on('pointerdown', () => {
      messagePopup.destroy();
      background.destroy();
    });
  }

  // Function to generate graph data
function generateGraphData() {
    let oppositionTrend = 50; // Starting at 50% approval
    let governmentTrend = 50; // Starting at 50% approval
    const maxFluctuation = 3; // Maximum fluctuation for each day
    const graphData = {
      "opposition": [],
      "government": []
    };
  
    // Generate data for 14 days
    for (let i = 0; i < 14; i++) {
      // Random fluctuation for each day
      oppositionTrend += (Math.random() - 0.5) * maxFluctuation;
      governmentTrend += (Math.random() - 0.5) * maxFluctuation;
  
      // Clamp the values to stay within 0-100%
      oppositionTrend = Math.min(100, Math.max(0, oppositionTrend));
      governmentTrend = Math.min(100, Math.max(0, governmentTrend));
  
      // Add the data points to the graphData
      graphData.opposition.push({ "day": i + 1, "value": oppositionTrend });
      graphData.government.push({ "day": i + 1, "value": governmentTrend });
    }
  
    return graphData;
  }
  
