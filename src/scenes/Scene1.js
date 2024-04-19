export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
        this.selectedData = [];
        this.currentTitleIndex = 0;
    }

    init(data) {
        // Use the gameData passed from the previous scene
        console.log('Received data in Scene1:', data); // Add this line to debug
        this.gameData = data.gameData;
        this.currentDay = this.gameData.gameState.currentDay;
        
        console.log('Current Day:', this.currentDay)
        
        // Initialize selectedData with the default values
        this.fill();
    }

    // fill() method to initialize selectedData
    fill() {
        const currentDayData = this.gameData.gameData.days[this.currentDay - 1];
        this.selectedData = currentDayData.articles.map((article, articleIndex) => {
            const currentTitles = article.headlines;
            return {
                article: 'article' + (articleIndex + 1),
                headline: {
                    title: currentTitles[0].title,
                    effect: currentTitles[0].effect,
                },
            };
        });
    }

    create() {
        // Create buttons for each article and display their first titles
        this.selectedData.forEach((data, articleIndex) => {
            const currentTitles = this.gameData.gameData.days[this.currentDay - 1].articles[articleIndex].headlines;

            const button = this.add.text(400, 50 * (articleIndex + 1), data.headline.title, { fontSize: '18px', fill: '#fff' })
                .setOrigin(0.5)
                .setInteractive();

            // Add button click event
            button.on('pointerdown', () => {
                // Update the title index for the clicked article
                this.currentTitleIndex = (this.currentTitleIndex + 1) % currentTitles.length;

                // Update the button text with the rotated title
                button.setText(currentTitles[this.currentTitleIndex].title);

                // Update selectedData with the clicked title for the corresponding article
                this.selectedData[articleIndex].headline.title = currentTitles[this.currentTitleIndex].title;
                this.selectedData[articleIndex].headline.effect = currentTitles[this.currentTitleIndex].effect;

                // Log the selected data
                console.log('showData', this.selectedData);
            });
        });

        // Add a "Publish" button to the scene
        const publishButton = this.add.text(600, 550, 'Publish', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

        publishButton.on('pointerdown', () => {
            // Update gameData with the selected data
            this.gameData.gameState.selected = this.selectedData;

            // Log the updated gameData
            console.log('Updated gameData:', this.gameData);

            // Move to Scene2 and pass data using init
            this.scene.start('Scene2', { gameData: this.gameData });
        });
    }
}