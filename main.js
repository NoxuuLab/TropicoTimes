import Scene1 from './src/scenes/Scene1.js'
import Scene2 from './src/scenes/Scene2.js'
import Scene3 from './src/scenes/Scene3.js'

// main.js
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Scene1, Scene2, Scene3]
};

const game = new Phaser.Game(config);
