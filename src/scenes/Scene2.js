// Scene2.js
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    init(data) {
        // Data passed from Scene1
        console.log('Scene 2: Received Data in init:', data.selectedData);

        // Store the received data in the scene's property
        this.selectedData = data.selectedData;
    }

    create() {
        console.log('Scene 2 created!');

        // Display the selectedData on the screen
        const textStyle = { fontSize: '18px', fill: '#fff' };

        Object.keys(this.selectedData).forEach((key, index) => {
            const title = this.selectedData[key].title;
            this.add.text(100, 50 * (index + 1), title, textStyle);
        });
    }
}
