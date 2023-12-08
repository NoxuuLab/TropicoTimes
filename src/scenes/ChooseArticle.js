export default class ChooseArticle extends Phaser.Scene {
  constructor() {
    super({ key: 'ChooseArticle' });
  }

  preload() {
    this.load.image('blocks', 'src/assets/introductionScene/blocks.png');
  }

  create() {
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
    });
  }
}
