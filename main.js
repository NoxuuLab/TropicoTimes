// main.js
import IntroductionScene from './src/scenes/IntroductionScene.js';
import MainScene from './src/scenes/MainScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1080,
    height: 640,
    scene: [IntroductionScene, MainScene],
  
  };

  
  const game = new Phaser.Game(config);


  