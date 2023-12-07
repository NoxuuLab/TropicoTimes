// IntroductionScene.js
<<<<<<< Updated upstream
import { commonTextStyle, headerTextStyle } from './src/styles/textStyles';
=======
import { commonTextStyle, headerTextStyle } from "../styles/textStyles.js";
>>>>>>> Stashed changes


class IntroductionScene extends Phaser.Scene {
    constructor() {
      super({ key: 'IntroductionScene' });
    }
  
    preload() {
      // Load assets for the introduction scene
<<<<<<< Updated upstream
      this.load.image('background', './src/assets/introductionScene/background.png');
      this.load.image('startButton', './src/assets/introductionScene/ButtonEnter.png');
=======
      this.load.image('background', '/src/assets/introductionScene/background.png');
      this.load.image('startButton', '/src/assets/introductionScene/ButtonEnter.png');
>>>>>>> Stashed changes
    }
  
    create() {

      // Set up the introduction scene
    const backgroundImage = this.add.image(540, 320, 'background'); // Centered position
      // Set up text styling

     // Add rules text using Phaser Text object
     const rulesText = this.add.text(50, 50, 'Rules:', headerTextStyle);

     const rule1 = this.add.text(50, 150, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla at odio commodo auctor. Pellentesque maximus tellus non erat gravida porta. Suspendisse eu eleifend ex.', commonTextStyle);
     const rule2 = this.add.text(50, 350, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla at odio commodo auctor. Pellentesque maximus tellus non erat gravida porta. Suspendisse eu eleifend ex.', commonTextStyle);

     // Add the Text objects to the scene
     this.add.existing(rulesText);
     this.add.existing(rule1);
     this.add.existing(rule2);

    const startButton = this.add.sprite(880, 550, 'startButton').setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start('MainScene');
    });
  
      // Add text or other elements to explain the rules
    }
  }
  