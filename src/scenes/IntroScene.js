//IntroScene.js
export default class IntroScene extends Phaser.Scene {
  constructor() {
      super({ key: 'IntroScene' }); // Scene identifier
  }

  init(data) {
      this.gameData = data.gameData; // Receive game data from BootScene
  }

  preload() {
      // Load assets specific to the intro scene
      this.load.audio('buttonClick', 'src/assets/buttonClick.mp3'); // Button click sound
      this.load.image('TropicoTimes', 'src/assets/TropicoTimes.png'); // Tropico Times logo
  }

  create() {
    this.cameras.main.setBackgroundColor('#ffffff'); // Set background color
  

    // Display the Tropico Times logo at the top of the screen
    const tropicoLogo = this.add.image(400, 80, 'TropicoTimes')
        .setScale(0.4)
        .setPosition(400, 70);

    // Load button click sound effect
    this.buttonClickSound = this.sound.add('buttonClick');

    // Add welcome text below the logo
    this.add.text(400, 130, "Welcome to Tropico Times", {
        fontFamily: 'Roboto Mono',
        fontSize: '26px',
        fill: '#333',
    }).setOrigin(0.5, 0);

    // Display the introductory narrative text
    const introText = `
           
      You are the new editor-in-chief.

      The island of Tropico is in turmoil. El Presidente, a tyrant of the highest order, is tightening his grip on power. He controls the media, the military, and, most worryingly, the minds of the people.

      Your uncle, Professeur Riviera, a man of intelligence, integrity, and progressive ideals, has decided to challenge El Presidente in the upcoming elections. But his ideas, as brilliant as they are, fall on deaf ears. The public, enamored by El Presidente's empty promises and iron fist, needs to be shown the light.

      It is your job to tip the scales. As the new editor of Tropico Times, you have 7 days to influence the people. Publish the truth, amplify Professeur Riviera’s message, and expose the lies of El Presidente.

      If you fail, El Presidente will continue his reign of 
      terror, and you, along with your family and 
      Professeur Riviera, will pay the ultimate price.

      Choose wisely. Amplify strategically.
      The future of Tropico depends on you.
      `;
      this.add.text(100, 160, introText, {
          fontFamily: 'Roboto Mono',
          fontSize: '14px',
          fill: '#333',
          wordWrap: { width: 600, useAdvancedWrap: true }
      });

      // Create the "Start Work" button
      const startButton = this.add.image(400, 650, 'startButton')
        .setInteractive({ useHandCursor: true })
        .setScale(0.25)
        .setPosition(610, 500);

      // Add functionality to the button
      startButton.on('pointerdown', () => {
        this.buttonClickSound.play();
      
        console.log('Passing gameData to Scene1:', this.gameData); 
        this.scene.start('Scene1', { gameData: this.gameData }); // Pass gameData to Scene1
      });
      startButton.on('pointerover', () => {
        startButton.setTint(0x44ff44);
      });

      startButton.on('pointerout', () => {
        startButton.clearTint();
      });
  }

  
}
