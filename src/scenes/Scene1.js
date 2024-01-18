// Scene1.js
export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });

         // Initialize an empty selectedData object
         this.selectedData = {};
    }

    create() {
        // Define your data
        const data = [
            { title: "Dictator sucks", effect: -1 },
            { title: "Dictator is awesome", effect: +2 }
        ];

        // Choose random data
        const selectedData = Phaser.Math.RND.pick(data);

        // Create buttons for each title
        data.forEach((entry, index) => {
            const button = this.add.text(400, 100 * (index + 1), entry.title, { fontSize: '32px', fill: '#fff' })
                .setOrigin(0.5)
                .setInteractive();
        
            // Log the selected data
            console.log('showData', this.selectedData);
        
            // Handle button click
            button.on('pointerdown', () => {
                // Update selectedData with the clicked title
                this.selectedData = entry;
            });
        });
        

    // Add a "Publish" button to the scene
    const publishButton = this.add.text(600, 500, 'Publish', { fontSize: '32px', fill: '#fff' })
        .setOrigin(0.5)
        .setInteractive();

    // Handle publish button click
    publishButton.on('pointerdown', () => {
        // Move to Scene2 and pass data using init
        this.scene.start('Scene2', { selectedData: this.selectedData });
    });
}
}
