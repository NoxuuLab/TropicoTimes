// main.js

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1080,
    height: 640,
    scene: [IntroductionScene, MainScene],
  
  };

  
  const game = new Phaser.Game(config);


  