// IntroductionScene.js
console.log("IntroductionScene loaded");


class IntroductionScene extends Phaser.Scene {
    constructor() {
      super({ key: 'IntroductionScene' });
    }
  
    preload() {
      // Load assets for the introduction scene
      this.load.image('background', 'assets/introductionScene/IntroductionSceneBackground.png');
      this.load.image('startButton', 'assets/introductionScene/ButtonEnter.png');
    }
  
    create() {
      // Set up the introduction scene
      this.add.image(400, 300, 'background');
  
      const startButton = this.add.sprite(400, 500, 'startButton').setInteractive();
  
      startButton.on('pointerdown', () => {
        this.scene.start('MainScene');
      });
  
      // Add text or other elements to explain the rules
    }
  }
  