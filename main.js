// main.js
//import IntroductionScene from './src/scenes/IntroductionScene.js';
//import MainScene from './src/scenes/MainScene.js';
import ChooseArticle from './src/scenes/ChooseArticle.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    scene: [ChooseArticle],
  
  };

  
  const game = new Phaser.Game(config);


  