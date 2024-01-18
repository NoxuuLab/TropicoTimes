// Scene1.js
import { myData } from '/src/scenes/data.js';

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });

        // Initialize variables
        this.selectedData = {};
        this.currentDay = 1;
        this.currentArticle = 1;
        this.currentTitleIndex = 0;
    }

    create() {
        // Create buttons for each article and display their first titles
        for (let articleNum = 1; articleNum <= 6; articleNum++) {
            const currentTitles = myData['day' + this.currentDay]['article' + articleNum];

            const button = this.add.text(400, 50 * articleNum, currentTitles[0].title, { fontSize: '18px', fill: '#fff' })
                .setOrigin(0.5)
                .setInteractive();

            // Add button click event
            button.on('pointerdown', () => {
                // Update the title index for the clicked article
                this.currentTitleIndex = (this.currentTitleIndex + 1) % currentTitles.length;

                // Update the button text with the rotated title
                button.setText(currentTitles[this.currentTitleIndex].title);

                // Update selectedData with the clicked title for the corresponding article
                this.selectedData['article' + articleNum] = {
                    title: currentTitles[this.currentTitleIndex].title,
                    effect: currentTitles[this.currentTitleIndex].effect,
                };

                // Log the selected data
                console.log('showData', this.selectedData);
            });
        }

        // Add a "Publish" button to the scene
        const publishButton = this.add.text(600, 500, 'Publish', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

       // Handle publish button click
publishButton.on('pointerdown', () => {
    // Save the clicked titles and effects
    for (let articleNum = 1; articleNum <= 6; articleNum++) {
        const currentTitles = myData['day' + this.currentDay]['article' + articleNum];
        const selectedTitle = currentTitles[this.currentTitleIndex];

        this.selectedData['article' + articleNum] = {
            title: selectedTitle ? selectedTitle.title : currentTitles[0].title,
            effect: selectedTitle ? selectedTitle.effect : currentTitles[0].effect,
        };
    }

    // Move to Scene2 and pass data using init
    this.scene.start('Scene2', { selectedData: this.selectedData });
});

    }
}
