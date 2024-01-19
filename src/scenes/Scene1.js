// Scene1.js
import gameData from '/src/scenes/gameData.js';

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });

        // Initialize variables
        this.selectedData = {};
        this.currentDay = gameData.gameState.currentDay;
        this.currentTitleIndex = 0;
    }

    // fill() method to initialize selectedData
    fill() {
        const currentDayData = gameData.gameData.days[this.currentDay - 1];

        currentDayData.articles.forEach((article, articleIndex) => {
            const currentTitles = article.headlines;

            this.selectedData['article' + (articleIndex + 1)] = {
                title: currentTitles[0].title,
                effect: currentTitles[0].effect,
            };
        });
    }

    create() {
        // Initialize selectedData with the default values
        this.fill();

        // Create buttons for each article and display their first titles
        gameData.gameData.days[this.currentDay - 1].articles.forEach((article, articleIndex) => {
            const currentTitles = article.headlines;

            const button = this.add.text(400, 50 * (articleIndex + 1), currentTitles[0].title, { fontSize: '18px', fill: '#fff' })
                .setOrigin(0.5)
                .setInteractive();

            // Add button click event
            button.on('pointerdown', () => {
                // Update the title index for the clicked article
                this.currentTitleIndex = (this.currentTitleIndex + 1) % currentTitles.length;

                // Update the button text with the rotated title
                button.setText(currentTitles[this.currentTitleIndex].title);

                // Update selectedData with the clicked title for the corresponding article
                this.selectedData['article' + (articleIndex + 1)] = {
                    title: currentTitles[this.currentTitleIndex].title,
                    effect: currentTitles[this.currentTitleIndex].effect,
                };

                // Log the selected data
                console.log('showData', this.selectedData);
            });
        });

        // Add a "Publish" button to the scene
        const publishButton = this.add.text(600, 500, 'Publish', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

        // Handle publish button click
        publishButton.on('pointerdown', () => {
            // No need to save the clicked titles and effects here anymore
            // because we initialized them in the fill() method

            // Move to Scene2 and pass data using init
            this.scene.start('Scene2', { selectedData: this.selectedData });
        });
    }
}
