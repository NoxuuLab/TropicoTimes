// FinishScene.js
export default class FinishScene extends Phaser.Scene {
    constructor() {
      super({ key: 'FinishScene' });
    }
  
    create() {
      // Display a message indicating the game is finished
      const message = this.add.text(400, 300, 'Game Over', {
        fontSize: '48px',
        fill: '#fff',
      });
      message.setOrigin(0.5);
  
      // Add a "Restart" button
      const restartButton = this.add.text(400, 400, 'Restart', {
        fontSize: '32px',
        fill: '#0f0',
      });
      restartButton.setOrigin(0.5);
      restartButton.setInteractive();
  
      // Add a pointerdown event listener to the "Restart" button
      restartButton.on('pointerdown', () => {
        // Restart the game by transitioning back to the boot scene
        this.scene.start('BootScene');
      });
    }
  }
  