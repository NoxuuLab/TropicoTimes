// Scene3.js
export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
  }

  init(data) {
    // Data passed from Scene2
    console.log('Scene 3: Received Data in init:', data.publishData);

    // Store the received data in the scene's property
    this.publishData = data.publishData;
  }

  create() {
    console.log('Scene 3 created!');

    // Calculate the sum of titleAmplification
    const sumTitleAmplification = this.publishData.reduce((sum, data) => sum + data.titleAmplification, 0);

    // Display the sum on the screen
    const textStyle = { fontSize: '24px', fill: '#fff' };
    this.add.text(400, 300, `Sum of Title Amplification: ${sumTitleAmplification}`, textStyle)
      .setOrigin(0.5);
  }
}
