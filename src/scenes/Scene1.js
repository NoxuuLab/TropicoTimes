import textStyle from '/src/styles/textStyles.js';

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' }); // Scene identifier
        this.selectedData = []; // Stores selected articles and their titles
        this.currentTitleIndex = 0; // Tracks current headline being displayed
    }

    init(data) {
        // Initialize scene with game data from previous scene
        console.log('Received data in Scene1:', data); // Debugging line
        this.gameData = data.gameData;
        this.currentDay = this.gameData.gameState.currentDay; // Get the current day
        console.log('Current Day in Scene1:', this.currentDay); // Debugging line
        this.fill(); // Populate articles for the current day
    }

    preload() {
        // Load necessary assets for this scene
        this.load.audio('buttonClick', 'src/assets/buttonClick.mp3'); // Load button click sound
        this.load.image('rotateIcon', 'src/assets/rotateIcon.png'); // Load rotation icon
        this.load.image('publishButton', 'src/assets/publishButton.png'); // Load publish button image
    }

    fill() {
        // Prepare articles with default titles for the current day
        const currentDayData = this.gameData.gameData.days[this.currentDay - 1];
        this.selectedData = currentDayData.articles.map((article, articleIndex) => {
            const currentTitles = article.headlines;
            return {
                article: 'article' + (articleIndex + 1),
                headline: {
                    title: currentTitles[0].title, // Default to the first title
                    effect: currentTitles[0].effect, // Effect on public opinion
                },
            };
        });
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffff'); // Set background color
        const articles = this.gameData.gameData.days[this.currentDay - 1].articles;
        this.buttonClickSound = this.sound.add('buttonClick'); // Button click sound
        
        // Main title for the scene
        this.add.text(
            this.cameras.main.centerX, 
            20, 
            "Today's news in Tropico Island", 
            textStyle.messageText // Use the messageText style from textStyle.js
        ).setOrigin(0.5, 0);
        
        
        // Instructional text for the player
        this.add.text(
            this.cameras.main.centerX, 
            80, 
            "Click on the headlines to explore alternate versions", 
            textStyle.mainText
            ).setOrigin(0.5, 0);
        
        // Display each article's headline with animations and interactions
        this.selectedData.forEach((data, index) => {
            const yPosition = 100 + 60 * (index + 1);
            const button = this.add.text(40, yPosition, data.headline.title, textStyle.mainText)
                .setOrigin(0, 0)
                .setAlpha(0)  // Start with invisible text
                .setInteractive();

            // Fade-in and slide-up animation
            this.tweens.add({
                targets: button,
                y: yPosition,
                alpha: 1,
                delay: index * 300,  // Staggered delay for each article
                duration: 500,  // Animation duration
                ease: 'Power2'
            });

            // Rotating icon for each headline
            const icon = this.add.image(700, yPosition + 10, 'rotateIcon')
                .setOrigin(0.5)
                .setScale(0.2)  // Scale down the icon
                .setAlpha(0.5);

            // Animate the icon's appearance
            this.tweens.add({
                targets: icon,
                y: yPosition + 10,
                alpha: 1,
                delay: index * 300,
                duration: 500,
                ease: 'Power2'
            });

            // Add hover effects and rotation animation on icon
            button.on('pointerover', () => {
                button.setStyle({ backgroundColor: '#f0f0f0', fill: '#f39c12' });
                icon.setTint(0xf39c12); // Brighten the icon

                // Rotation animation on hover
                this.tweens.add({
                    targets: icon,
                    angle: 360, // Rotate 360 degrees
                    duration: 500,
                    ease: 'Cubic.easeOut',
                    onComplete: () => {
                        icon.angle = 0; // Reset angle after rotation
                    }
                });
            });

            button.on('pointerout', () => {
                button.setStyle({ backgroundColor: '#ffffff', fill: '#333' }); // Revert styles
                icon.clearTint(); // Revert icon color
            });

            // Rotate the headline to the next one on click
            button.on('pointerdown', () => this.rotateTitle(button, index, articles));
        });

        this.addPublishButton(); // Add the publish button to the scene
    }

    rotateTitle(button, index, articles) {
        // Rotate through available headlines for the selected article
        const titles = articles[index].headlines;
        this.currentTitleIndex = (this.currentTitleIndex + 1) % titles.length;
        button.setText(titles[this.currentTitleIndex].title);
        this.selectedData[index].headline = titles[this.currentTitleIndex];
        console.log('showData', this.selectedData);
    }

    addPublishButton() {
        // Create and configure the "Publish" button
        const publishButton = this.add.image(600, 550, 'publishButton')
            .setInteractive({ useHandCursor: true })
            .setScale(0.2) // Scale the button image
            .setPosition(720, 520); // Position the button

        // Publish the selected articles when clicked
        publishButton.on('pointerdown', () => {
            this.buttonClickSound.play();
            this.gameData.gameState.selected = this.selectedData;
            console.log('Updated gameData:', this.gameData);
            this.scene.start('Scene2', { gameData: this.gameData });
        });

        // Add hover effects for the publish button
        publishButton.on('pointerover', () => {
            publishButton.setTint(0x44ff44); // Change color on hover
        });

        publishButton.on('pointerout', () => {
            publishButton.clearTint(); // Revert color when not hovered
        });
    }
}
