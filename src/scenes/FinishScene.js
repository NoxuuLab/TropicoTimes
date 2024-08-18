import textStyle from '/src/styles/textStyles.js';

export default class FinishScene extends Phaser.Scene {
  constructor() {
      super({ key: 'FinishScene' });
  }

  init(data) {
      this.gameData = data.gameData;
  }

  preload() {
    // Load necessary assets for this scene
    this.load.audio('buttonClick', 'src/assets/buttonClick.mp3'); // Button click sound
    this.load.image('TropicoTimes', 'src/assets/TropicoTimes.png'); // Tropico Times logo
    this.load.image('restartButton', 'src/assets/restartButton.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#ffffff');

    const tropicoLogo = this.add.image(400, 80, 'TropicoTimes')
        .setScale(0.4)
        .setPosition(400, 70);

    // Determine the final result based on the ratings
    const finalRivieraRating = this.gameData.gameState.approvalTrends.riviera.slice(-1)[0];
    const finalPresidenteRating = this.gameData.gameState.approvalTrends.presidente.slice(-1)[0];
    
    let resultMessage = 'Riviera is dead.'; // Default to Riviera losing

    if (finalRivieraRating > finalPresidenteRating) {
        resultMessage = "Riviera wins! Looks like brains do beat brawn—Riviera's now the big cheese! Time to celebrate with some intellectual cocktails. El Presidente? Well, he’s already packing for his 'permanent vacation.'";
    } else {
        resultMessage = "Riviera is dead. Well, that’s a wrap! Turns out being the smartest guy in the room isn't enough when the room is full of El Presidente’s goons. Riviera’s off to the history books—or maybe just the obituaries.";
    }

    // Display the final result message
    const message = this.add.text(400, 270, resultMessage, textStyle.finalMessage);
    message.setOrigin(0.5);

    // Add a "Restart" button
    const restartButton = this.add.image(400, 500, 'restartButton')
        .setInteractive({ useHandCursor: true }) // Make it interactive
        .setScale(0.5);

    // Add a pointerdown event listener to the "Restart" button
    restartButton.on('pointerdown', () => {
        // Play button click sound
        this.sound.play('buttonClick');
        
        // Restart the game by transitioning back to the boot scene
        this.scene.start('BootScene');
    });

    // Optional: Add hover effects
    restartButton.on('pointerover', () => {
        restartButton.setTint(0x44ff44); // Lighten on hover
    });

    restartButton.on('pointerout', () => {
        restartButton.clearTint(); // Remove hover effect
    });
  }
}
