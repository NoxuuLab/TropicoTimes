// gameCycle.js

// Import the gameData object
import gameData from './gameData.js'; 

// Function to generate trend data for a candidate with a condition on the second candidate
export function generateCandidateTrendWithCondition(startingApproval, trend, days, differenceRange) {
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

export function initializeGameState(gameData) {
  // Generate trend data for El Presidente
  const days = 14; // Number of preliminary days before the game starts
  const startingApproval = 50; // Starting approval rating
  const presidenteTrend = generateCandidateTrendWithCondition(startingApproval, -0.5, days, null);

  // Generate trend data for Riviera with the condition of being 2% to 15% lower
  let rivieraTrend = [];
  presidenteTrend.forEach((presidenteRating, index) => {
      // Generate a random difference between 2% to 15%
      const randomDifference = 2 + Math.random() * 13;
      const rivieraRating = Math.max(0, presidenteRating - randomDifference); // Ensure Riviera's rating is not negative
      rivieraTrend.push(rivieraRating);
  });

  // Initialize the game state with the generated trends
  gameData.gameState = {
      currentDay: 1,
      maxDay: gameData.gameData.days.length, // Set the maxDay dynamically based on the dataset
      selected: [],
      history: [],
      approvalTrends: {
          'riviera': rivieraTrend,
          'presidente': presidenteTrend
      }
  };

  // Logging the initial data
  console.log("Game state initialized with approval trends:", gameData.gameState['approvalTrends']);
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


  export function adjustApprovalTrends(gameData, sumAmplifiedPost) {
    // Get the last index of the trends array for each candidate
    let lastPresidenteIndex = gameData.gameState.approvalTrends.presidente.length - 1;
    let lastRivieraIndex = gameData.gameState.approvalTrends.riviera.length - 1;
  
    // Get the last approval rating value for each candidate
    let lastPresidenteRating = gameData.gameState.approvalTrends.presidente[lastPresidenteIndex];
    let lastRivieraRating = gameData.gameState.approvalTrends.riviera[lastRivieraIndex];
  
    // Log the last values before the change
    console.log(`Last Presidente Rating: ${lastPresidenteRating}`);
    console.log(`Last Riviera Rating: ${lastRivieraRating}`);
  
    // Calculate new ratings, ensuring they are within 0-100%
    let newPresidenteRating = Math.min(100, Math.max(0, lastPresidenteRating + sumAmplifiedPost));
    let newRivieraRating = Math.min(100, Math.max(0, lastRivieraRating - sumAmplifiedPost));
  
    // Log the new values after the change
    console.log(`New Presidente Rating: ${newPresidenteRating}`);
    console.log(`New Riviera Rating: ${newRivieraRating}`);
  
    // Update the trends with the new ratings by appending the new value to the end of the array
    gameData.gameState.approvalTrends.presidente.push(newPresidenteRating);
    gameData.gameState.approvalTrends.riviera.push(newRivieraRating);
  
    return {
      lastPresidenteRating, 
      newPresidenteRating,
      lastRivieraRating, 
      newRivieraRating
  };
  }
    // This function handles everything related to the popup and the "Next Day" button
    export function showPopupWithNextButton(scene, message, gameData) {
      const popupWidth = 800;
      const popupHeight = 400;
      const popupX = (scene.cameras.main.width - popupWidth) / 2;
      const popupY = (scene.cameras.main.height - popupHeight) / 2;
  
      // Create the popup background using Phaser's built-in methods
      const background = scene.add.rectangle(
          popupX + popupWidth / 2,
          popupY + popupHeight / 2,
          popupWidth,
          popupHeight,
          0x000000,
          0.8
      ).setOrigin(0.5).setInteractive();
  
      // Create the popup text using Phaser's built-in methods
      const messagePopup = scene.add.text(
          popupX + 20,
          popupY + 20,
          message,
          {
              fontSize: '32px',
              fill: '#ffffff', // White text for visibility
              wordWrap: { width: popupWidth - 40 },
              fontFamily: 'Arial',
          }
      ).setOrigin(0, 0);
  
      // Create the "Next Day" button using Phaser's built-in methods
      const nextDayButton = scene.add.text(
          popupX + popupWidth / 2,
          popupY + popupHeight - 50,
          'Next Day',
          {
              fontSize: '32px',
              fill: '#fff',
              backgroundColor: '#000',
              padding: { x: 10, y: 5 },
              border: { color: '#fff', width: 2 },
          }
      ).setOrigin(0.5).setInteractive();
  
      // Handle the "Next Day" button click
      nextDayButton.on('pointerdown', () => {
          background.destroy();
          messagePopup.destroy();
          nextDayButton.destroy();
  
          if (gameData.gameState.currentDay < gameData.gameState.maxDay) {
              goToNextDay(gameData);
              scene.scene.start('Scene1', { gameData });
          } else {
              scene.scene.start('FinishScene');
          }
      });
  
      // Allow closing the popup by clicking the background
      background.on('pointerdown', () => {
          messagePopup.destroy();
          background.destroy();
          nextDayButton.destroy();
      });
  
      // Ensure the popup and its components are on top
      scene.children.bringToTop(background);
      scene.children.bringToTop(messagePopup);
      scene.children.bringToTop(nextDayButton);
  }

  
  
  
    
    
    
    
    


  
