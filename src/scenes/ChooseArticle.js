export default class ChooseArticle extends Phaser.Scene {
  constructor() {
    super({ key: 'ChooseArticle' });
  }

  preload() {
    this.load.image('background', 'src/assets/introductionScene/background.png');
    this.load.image('small', 'src/assets/introductionScene/small_article.png');
    this.load.image('medium', 'src/assets/introductionScene/medium_article.png');
    this.load.image('large', 'src/assets/introductionScene/large_article.png');
  }

  create() {
    // Add background image
    this.add.image(400, 300, 'background');

    // Create a grid
    var gridSizeX = 4;
    var gridSizeY = 5;
    var tileSizeX = 400 / gridSizeX;
    var tileSizeY = 500 / gridSizeY;

    for (let i = 0; i < gridSizeX; i++) {
      for (let j = 0; j < gridSizeY; j++) {
        // Calculate the position of each grid cell
        var x = i * tileSizeX + tileSizeX / 2;
        var y = j * tileSizeY + tileSizeY / 2;

        // Draw a rectangle to represent each grid cell with a white stroke
        this.add.rectangle(x, y, tileSizeX, tileSizeY, 0x000000).setStrokeStyle(2, 0xffffff);
      }
    }
    var smallArticle = this.add.image(800, 150, 'small').setInteractive({ draggable: true });
    var mediumArticle = this.add.image(800, 300, 'medium').setInteractive({ draggable: true });
    var largeArticle = this.add.image(800, 450, 'large').setInteractive({ draggable: true });

    this.input.setDraggable(smallArticle);
    this.input.setDraggable(mediumArticle);
    this.input.setDraggable(largeArticle);

    // Add event listeners for drag events
    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
      gameObject.clearTint();
    });

  }
}
