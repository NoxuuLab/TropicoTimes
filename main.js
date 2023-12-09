// main.js
//import IntroductionScene from './src/scenes/IntroductionScene.js';
//import MainScene from './src/scenes/MainScene.js';
//import ChooseArticle from './src/scenes/ChooseArticle.js';
import MapTiles from './src/scenes/Maptile.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    scene: [MapTiles],
  
  };

  
  const game = new Phaser.Game(config);
  export default game;


  