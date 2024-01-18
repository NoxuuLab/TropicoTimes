// Scene1.js
export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
    }

    create() {
        // Define your data
        const data = [
            { title: "Dictator sucks", effect: -1 },
            { title: "Dictator is awesome", effect: +2 }
        ];

        // Choose random data
        const selectedData = Phaser.Math.RND.pick(data);

        // Log the selected data
        console.log('showData', selectedData);

        // Move to Scene2 and pass data using init
        this.scene.start('Scene2', { selectedData });
    }
}
