// gameCycle.js

// Import the gameData object
import gameData from './gameData.js'; 

// Function to initialize the game state
// gameCycle.js

// ... other imports and functions ...

// Updated function to initialize the entire game state
export function initializeGameState(gameData) {
  // Update maxDay with the length of the days array in gameData
  gameData.gameState = {
      currentDay: 1,
      maxDay: gameData.gameData.days.length, // Set the maxDay dynamically based on the dataset
      selected: [],
      history: []
  };

  // Generate trend data for each candidate
  const days = 14; // Number of days for the trend
  const startingApproval = 50; // Starting approval rating
  const rivieraTrend = generateCandidateTrend(startingApproval, 0.5, days);
  const presidenteTrend = generateCandidateTrend(startingApproval, -0.5, days);

  // Insert the trend data
  gameData.gameState['approvalTrends'] = {
      'riviera': rivieraTrend,
      'presidente': presidenteTrend
  };

  // Logging the initial data
  console.log("Game state initialized with approval trends:", gameData.gameState['approvalTrends']);
}

// ... other exports and functions ...


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

 
  // Function to generate trend data for a candidate
  export function generateCandidateTrend(startingApproval, trend, days) {
    let approvalRatings = [];
    let currentApproval = startingApproval;
    
    for (let i = 0; i < days; i++) {
      // Add random fluctuation to the current approval rating
      let fluctuation = (Math.random() * 10 - 5); // Random number between -5 and 5
      currentApproval += fluctuation + trend;

      // Ensure approval rating is within bounds
      currentApproval = Math.max(0, Math.min(100, currentApproval));

      approvalRatings.push(currentApproval);
    }
    
    return approvalRatings;
  }

    // Generate trend data for each candidate
    const days = 14;
    const rivieraTrend = generateCandidateTrend(50, 0.5, days);
    const presidenteTrend = generateCandidateTrend(50, -0.5, days);

    // Insert this trend data into the gameData object
    export function injectTrendDataIntoGameState(gameData, rivieraTrend, presidenteTrend) {
      // Inserting the data under `gameState` within the gameData object
      gameData.gameState['approvalTrends'] = {
        'riviera': rivieraTrend,
        'presidente': presidenteTrend
      };
    
      // Logging the initial data
      console.log("Initial data injected into gameData:", gameData.gameState['approvalTrends']);
    }


  
