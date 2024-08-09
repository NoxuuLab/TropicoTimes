import BootScene from './src/scenes/BootScene.js';
import IntroScene from './src/scenes/IntroScene.js'
import Scene1 from './src/scenes/Scene1.js';
import Scene2 from './src/scenes/Scene2.js';
import Scene3 from './src/scenes/Scene3.js';
import FinishScene from './src/scenes/FinishScene.js';

// main.js
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: [BootScene, IntroScene, Scene1, Scene2, Scene3, FinishScene]
};

const game = new Phaser.Game(config);
export default game;
