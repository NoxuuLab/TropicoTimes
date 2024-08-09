export default class IntroScene extends Phaser.Scene {
  constructor() {
      super({ key: 'IntroScene' });
  }

  init(data) {
      this.gameData = data.gameData; // Receive gameData from BootScene
  }

  create() {
      // Play background music
      this.introMusic = this.sound.add('introMusic', {
          loop: true,
          volume: 0.5,
      });

      this.sound.context.resume().then(() => {
          this.introMusic.play();
      });

            // Display the introductory text
            const introText = `
            Welcome to Tropico Times. You are the new editor-in-chief.
            
            The war with Antegria is over and the rebellion uprising has been crushed. Order is slowly returning to Tropico.
            
            The public is not loyal to the government.
            
            It is your job to increase their loyalty by editing The Tropico Times carefully. Pick only stories that highlight the good things about Tropico and its government.
            
            You have 3 days to raise the public's loyalty to 20.
            
            As a precaution against influence, we are keeping your wife and child in a safe location.
        `;
  
        this.add.text(100, 50, introText, {
            fontFamily: 'Roboto Mono',
            fontSize: '18px',
            color: '#ffffff',
            wordWrap: { width: 600, useAdvancedWrap: true }
        });

      this.add.text(100, 50, introText, {
          fontFamily: 'Roboto Mono',
          fontSize: '18px',
          color: '#ffffff',
          wordWrap: { width: 600, useAdvancedWrap: true }
      });

      // Create the "Start Work" button using the image
      const startButton = this.add.image(400, 500, 'startButton')
          .setInteractive({ useHandCursor: true })
          .setScale(0.1)
          .setPosition(400, 500);

      // Add functionality to the button
      startButton.on('pointerdown', () => {
          this.introMusic.stop(); // Stop the music
          console.log('Passing gameData to Scene1:', this.gameData); // Debug line
          this.scene.start('Scene1', { gameData: this.gameData }); // Pass gameData to Scene1
      });

      startButton.on('pointerover', () => {
          startButton.setTint(0x44ff44);
      });

      startButton.on('pointerout', () => {
          startButton.clearTint();
      });
  }

  update() {
      // Any updates you might need
  }
}
