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
    preload() {
        // Load assets
        this.load.audio('buttonClick', 'src/assets/buttonClick.mp3'); // Load the button click sound
        this.load.image('rotateIcon', 'src/assets/rotateIcon.png');
        this.load.image('publishButton', 'src/assets/publishButton.png');
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
        this.buttonClickSound = this.sound.add('buttonClick');
        
        this.add.text(this.cameras.main.centerX, 20, "Today's news in Tropico Island", {
            fontFamily: 'Roboto Mono',
            fontSize: '28px', 
            fill: '#333', 
        }).setOrigin(0.5, 0);
        
        // Add instructional text
        this.add.text(this.cameras.main.centerX, 80, "Click on the headlines to explore alternate versions", {
            fontFamily: 'Roboto Mono',
            fontSize: '14px', 
            fill: '#000000'  
        }).setOrigin(0.5, 0);
        
        this.selectedData.forEach((data, index) => {
            const yPosition = 100 + 60 * (index + 1);
            const button = this.add.text(40, yPosition, data.headline.title, textStyle.mainText)
                .setOrigin(0, 0)
                .setAlpha(0)  // Start with invisible text
                .setInteractive();
    
            // Add fade-in and slide-up animation
            this.tweens.add({
                targets: button,
                y: yPosition,
                alpha: 1,
                delay: index * 300,  // Delay for each subsequent article
                duration: 500,  // Animation duration
                ease: 'Power2'
            });
    
            // Add rotating icon next to each headline, scaling down and adjusting alignment
            const icon = this.add.image(700, yPosition + 10, 'rotateIcon')  
                .setOrigin(0.5)
                .setScale(0.2)  // Scale down the icon
                .setAlpha(0.5);
    
            // Animate the icon's appearance alongside the text
            this.tweens.add({
                targets: icon,
                y: yPosition + 10,
                alpha: 1,
                delay: index * 300,
                duration: 500,
                ease: 'Power2'
            });
    
            // Add hover effects with rotation animation
            button.on('pointerover', () => {
                button.setStyle({ backgroundColor: '#f0f0f0', fill: '#f39c12' });  // Background color and text color change
                icon.setTint(0xf39c12);  // Brighten the icon
    
                // Start rotation animation on hover
                this.tweens.add({
                    targets: icon,
                    angle: 360,  // Rotate by 360 degrees
                    duration: 500,  // Duration of rotation
                    ease: 'Cubic.easeOut',
                    onComplete: () => {
                        icon.angle = 0;  // Reset angle to 0 after rotation
                    }
                });
            });
    
            button.on('pointerout', () => {
                button.setStyle({ backgroundColor: '#ffffff', fill: '#333' });  // Revert to original background and text color
                icon.clearTint();  // Revert icon color
            });
    
            // Rotating the headline on click
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
        // Create the "Publish" button using the image
        const publishButton = this.add.image(600, 550, 'publishButton')
            .setInteractive({ useHandCursor: true })
            .setScale(0.2)  // Scale the button image to desired size
            .setPosition(720, 520);  // Set the position of the button
    
        // Add functionality to the button
        publishButton.on('pointerdown', () => {
            this.buttonClickSound.play();
            this.gameData.gameState.selected = this.selectedData;
            console.log('Updated gameData:', this.gameData);
            this.scene.start('Scene2', { gameData: this.gameData });
        });
    
        // Add hover effects
        publishButton.on('pointerover', () => {
            publishButton.setTint(0x44ff44);  // Change color on hover
        });
    
        publishButton.on('pointerout', () => {
            publishButton.clearTint();  // Revert color when not hovered
        });
    }
    
}    