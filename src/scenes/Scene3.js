// Scene3.js
export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
  }

  init(data) {
    // Data passed from Scene2
    console.log('Scene 3: Received gameData in init:', data.gameData);

    // Store the received gameData in the scene's property
    this.gameData = data.gameData;
  }

  create() {
    console.log('Scene 3 created!');

    // Calculate the sum of amplified posts
    const sumAmplifiedPost = this.gameData.gameState.selected.reduce((sum, item) => {
      // Ensure that amplifiedPost is a number before adding it to the sum
      return sum + (item.amplifiedPost || 0);
    }, 0);

    // Display the sum on the screen
    const textStyle = { fontSize: '24px', fill: '#fff' };
    this.add.text(400, 300, `Sum of Amplified Posts: ${sumAmplifiedPost}`, textStyle)
      .setOrigin(0.5);
  }
}
