import textStyle from '/src/styles/textStyles.js';
export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
        this.selectedData = [];
        this.currentTitleIndex = 0;
    }

    init(data) {
        console.log('Received data in Scene1:', data); // Debugging line
        this.gameData = data.gameData;
        this.currentDay = this.gameData.gameState.currentDay;
        console.log('Current Day in Scene1:', this.currentDay);
        this.fill();
    }

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
        this.cameras.main.setBackgroundColor('#ffffff');
        const articles = this.gameData.gameData.days[this.currentDay - 1].articles;
    
        const logo = this.add.image(this.cameras.main.centerX, 50, 'logo').setOrigin(0.5, 0);
        this.selectedData.forEach((data, index) => {
            const yPosition = 150 + 60 * (index + 1);
            const button = this.add.text(40, yPosition, data.headline.title, textStyle.mainText)
                .setOrigin(0, 0)
                .setInteractive();
    
            button.on('pointerdown', () => this.rotateTitle(button, index, articles));
        });
    
        this.addPublishButton();
    }
    
    rotateTitle(button, index, articles) {
        const titles = articles[index].headlines;
        this.currentTitleIndex = (this.currentTitleIndex + 1) % titles.length;
        button.setText(titles[this.currentTitleIndex].title);
        this.selectedData[index].headline = titles[this.currentTitleIndex];
        console.log('showData', this.selectedData);
    }
    
    addPublishButton() {
        const publishButton = this.add.text(600, 550, 'Publish', textStyle.publishButton)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.gameData.gameState.selected = this.selectedData;
                console.log('Updated gameData:', this.gameData);
                this.scene.start('Scene2', { gameData: this.gameData });
            });
    }
}    