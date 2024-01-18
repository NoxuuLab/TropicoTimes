// Scene2.js
export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });

        // Initialize variables
        this.selectedDataWithAmplification = [];
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
    
        // Initialize amplification for each title
        const titleAmplifications = {};
    
        Object.keys(this.selectedData).forEach((key, index) => {
            const titleData = this.selectedData[key];
            const title = titleData.title;
            titleAmplifications[title] = 0; // Default amplification is 0
    
            // Display title on the screen
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
                    titleAmplifications[title] = i;
    
                    // Log the values for verification
                    console.log(`Amplification for ${title}: ${titleAmplifications[title]}`);
    
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
            // Prepare data to pass to Scene3
            const publishData = Object.keys(this.selectedData).map((key) => {
                const data = this.selectedData[key];
                return {
                    title: data.title,
                    effect: data.effect,
                    titleAmplification: titleAmplifications[data.title],
                };
            });
    
            // Move to Scene3 and pass the data using init
            this.scene.start('Scene3', { publishData });
        });
    }
}    