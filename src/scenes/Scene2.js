// Scene2.js
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });

    }

    init(data) {
        // Data passed from Scene1
        console.log('Scene 2: Received Data in init:', data.selectedData);
        this.selectedData = data.selectedData;
    }

    create() {
        console.log('Scene 2 created!');
        const articlesData = this.selectedData;
    
        // Display the selectedData on the screen
        const textStyle = { fontSize: '18px', fill: '#fff' };



        // Initialize amplification for each title
        const amplifier = {};
    
        articlesData.forEach((articleData, index) => {
            const headlineData = articleData.headline;
            const title = headlineData.title;
            amplifier[title] = 0;

            // Display titles on the screen
            this.add.text(100, 50 * (index + 1), title, textStyle);
    
            // Add number buttons next to each title
            for (let i = 1; i <= 3; i++) {
                const button = this.add.text(250 + 50 * i, 50 * (index + 1), i.toString(), { fontSize: '18px', fill: '#fff' })
                    .setOrigin(0.5)
                    .setInteractive();
    
                // Add button click event
                button.on('pointerdown', () => {
                    // Reset all buttons to white
                    for (let j = 1; j <= 3; j++) {
                        const otherButton = this.children.getByName(`button_${title}_${j}`);
                        otherButton.setFill('#fff');
                    }
    
                    // Update the amplification for the current title
                    amplifier[title] = i;
    
                    // Log the values for verification
                    console.log(`Amplification for ${title}: ${amplifier[title]}`);
    
                    // Set the selected button color to red
                    button.setFill('#ff0000');
                }).setName(`button_${title}_${i}`);
            }
        });
    
        // Add a "Publish" button to the scene
        const publishButton = this.add.text(600, 500, 'Publish', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();
    
        // Handle publish button click
        publishButton.on('pointerdown', () => {
            // Modify selectedData array in-place
            this.selectedData.forEach((data) => {
                const titleData = data.headline;
                const title = titleData.title;
                const amplifierValue = amplifier[title];
                const amplifiedPost = amplifierValue * titleData.effect;
        
                // Add amplified values to the current data object
                data.amplifierValue = amplifierValue;
                data.amplifiedPost = amplifiedPost;
            });

            // Move to Scene3 and pass the data using init
            this.scene.start('Scene3', { selectedData: this.selectedData });
        });
    }
}
