// Scene2.js
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    init(data) {
        // Data passed from Scene1
        console.log('Scene 2: Received Data in init:', data.selectedData);
    }

    create() {
        console.log('Scene 2 created!');
    }
}
