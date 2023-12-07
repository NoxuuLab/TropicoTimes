// MainScene.js
console.log("IntroductionScene loaded");

class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    preload() {
      // Load assets for the main scene
      this.load.image('background', 'src/assets/introductionScene/IntroductionSceneBackground.png');
      // Load articles and other necessary assets
    }
  
    create() {
      
      // Set up the main scene
      this.add.image(400, 300, 'background');
      // Create containers, sprites, and other game elements
  
      // Enable drag and drop for articles
      this.input.dragDistanceThreshold = 16;
      this.input.on('dragstart', (pointer, gameObject) => {
        this.children.bringToTop(gameObject);
      });
  
      this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
  
      // Add logic for sorting articles into containers
    }
  }
  