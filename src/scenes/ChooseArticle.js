export default class ChooseArticle extends Phaser.Scene {
  constructor() {
    super({ key: 'ChooseArticle' });
  }

  preload() {
    this.load.image('blocks', 'src/assets/introductionScene/blocks.png');
    this.load.image('container', 'src/assets/introductionScene/container.png');

  }

  create() {
    const container = this.add.image(400, 300, 'container').setInteractive({ dropZone: true });
    const blocks = this.add.image(100, 100, 'blocks').setInteractive({ draggable: true });


    this.input.setDraggable(blocks);

    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', function (pointer, gameObject) {
      gameObject.clearTint();
      if (!container.getBounds().contains(gameObject.x, gameObject.y)) {
        // If not dropped in the container, reset to the initial position
        gameObject.x = 100;
        gameObject.y = 100;
      }
    });
  }
}
