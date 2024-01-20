// Scene2.js
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    init(data) {
        // Data passed from Scene1
        console.log('Scene 2: Received Data in init:', data.gameData);
        this.gameData = data.gameData;
        this.articlesData = this.gameData.gameState.selected;
        // Log the selected data
        console.log('Scene 2: Selected Data:', this.articlesData);
    }

    create() {
        console.log('Scene 2 created!');
        // Display the selectedData on the screen
        const textStyle = { fontSize: '18px', fill: '#fff' };

        // Initialize amplification for each article
        this.amplifier = new Array(this.articlesData.length).fill(0);

        this.articlesData.forEach((articleData, index) => {
            const title = articleData.headline.title; // Correctly references the title property

            // Display titles on the screen
            this.add.text(100, 50 * (index + 1), title, textStyle);

            // Add number buttons next to each title
            for (let i = 1; i <= 3; i++) {
                const button = this.add.text(250 + 50 * i, 50 * (index + 1), i.toString(), textStyle)
                    .setOrigin(0.5)
                    .setInteractive();

                // Add button click event
                button.on('pointerdown', () => {
                    // Update the amplification for the current article
                    this.amplifier[index] = i;

                    // Log the values for verification
                    console.log(`Amplification for ${title}: ${this.amplifier[index]}`);

                    // Visual feedback for the selected button
                    this.children.each(child => {
                        if (child.name && child.name.startsWith(`button_${index}_`)) {
                            child.setFill('#fff'); // Reset other buttons to white
                        }
                    });
                    button.setFill('#ff0000'); // Set the selected button color to red
                }).setName(`button_${index}_${i}`);
            }
        });

        // Add a "Publish" button to the scene
        const publishButton = this.add.text(600, 500, 'Publish', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

        // Handle publish button click
        publishButton.on('pointerdown', () => {
            // Update selectedData array with amplification values
            this.articlesData.forEach((item, index) => {
                const effect = item.headline.effect;
                const amplifierValue = this.amplifier[index];
                item.amplifiedPost = amplifierValue * effect; // Calculate the amplified post value
                item.amplifierValue = amplifierValue; // Store the amplifier value
            });

            // Log the final data for verification
            console.log('Final data to publish:', this.articlesData);

            // Move to Scene3 and pass the data using init
            this.scene.start('Scene3', { gameData: this.gameData });
        });
    }
}
