// Scene3.js
import { initializeGameState, goToNextDay, openPopup } from './gameCycle.js';


export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
  }

  init(data) {
    // Data passed from Scene2
    this.gameData = data.gameData;
  }

  create() {
    const sumAmplifiedPost = this.gameData.gameState.selected.reduce((sum, item) => sum + (item.amplifiedPost || 0), 0);

    const textStyle = { fontSize: '24px', fill: '#fff' };
    this.add.text(400, 300, `Sum of Amplified Posts: ${sumAmplifiedPost}`, textStyle).setOrigin(0.5);
// Add a "Popup" button to the scene
    let popupButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 150, 'Popup', { fontSize: '32px', fill: '#f00' })
    .setOrigin(0.5)
    .setInteractive();

    // When the "Popup" button is clicked, open the popup with the message
    popupButton.on('pointerdown', () => {
    openPopup(this, this.gameData.gameData.messages[0].message); // Assuming you want to show the first message
    });

    let nextDayButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Next Day', { fontSize: '32px', fill: '#0f0' })
      .setOrigin(0.5)
      .setInteractive();

      nextDayButton.on('pointerdown', () => {
        console.log('Current Day:', this.gameData.gameState.currentDay); // This line is fine.
        console.log('Max Day:', this.gameData.gameState.maxDay); // Use `this.gameData` instead of `gameData`.
        if (this.gameData.gameState.currentDay < this.gameData.gameState.maxDay) {
            // If it's not the last day, go to the next day (Scene1)
            goToNextDay(this.gameData);
            this.scene.start('Scene1', { gameData: this.gameData });
        } else {
            // If it's the last day, go to the FinishScene
            this.scene.start('FinishScene');
        }
      });
  }
}
