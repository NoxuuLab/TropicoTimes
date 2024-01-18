
export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
  }

  create() {
          // Move to Scene2 and pass data using init
          this.scene.start('Scene3', { selectedData });
  }
}
