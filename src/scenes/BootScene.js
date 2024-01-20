// BootScene.js
import gameData from './gameData.js';
import { initializeGameState } from './gameCycle.js'; // Make sure to import the function

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    // Initialize the game state before starting the game
    initializeGameState(gameData);

    // Now gameData.gameState should have maxDay set to the length of the days array
    console.log('Starting Scene1 with gameData:', gameData); // This should show the structure of gameData with maxDay set

    // Start the first scene (Scene1) and pass the initial gameData
    this.scene.start('Scene1', { gameData: gameData });
  }
}
