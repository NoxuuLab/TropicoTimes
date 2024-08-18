import { goToNextDay } from './gameCycle.js';
import textStyle from '/src/styles/textStyles.js';

export default class PopupScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PopupScene' });
    }

    init(data) {
        this.message = data.message;
        this.gameData = data.gameData;
    }

    preload() {
        // Load the next day button image and button click sound
        this.load.image('nextDayButton', 'src/assets/nextDay.png'); // Adjust the path as necessary
        this.load.audio('buttonClickSound', 'src/assets/buttonClick.mp3'); // Load the button click sound
    }

    create() {
        // Set the background color for the entire scene
        this.cameras.main.setBackgroundColor('#ffffff'); // Set the background color

        // Play button click sound
        this.buttonClickSound = this.sound.add('buttonClickSound');

        // Create the popup text
        const messageText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2 - 50,
            this.message,
            textStyle.messageText // Apply the messageText style
        ).setOrigin(0.5);

        // Add the signature "El Presidente's spy" under the message
        const signatureText = this.add.text(
            this.cameras.main.width / 2,
            80, // Positioned slightly below the main message
            "El Presidente’s spy has a message for you:",
            {
                fontSize: '18px',
                fill: '#333',
                fontFamily: 'Roboto Mono',
            }
        ).setOrigin(0.5);

        // Create the "Next Day" image button and center it on the x-axis
        const nextDayButton = this.add.image(
            this.cameras.main.width / 2,  // Centered on the x-axis
            460,                          // Y position
            'nextDayButton'
        )
        .setInteractive({ useHandCursor: true })
        .setScale(0.5); // Scale the button image

        // Add pointer down event to the button
        nextDayButton.on('pointerdown', () => {
            this.buttonClickSound.play(); // Play the button click sound

            if (this.gameData.gameState.currentDay < this.gameData.gameState.maxDay) {
                goToNextDay(this.gameData);
                this.scene.start('Scene1', { gameData: this.gameData });
            } else {
                this.scene.start('FinishScene', { gameData: this.gameData });
            }
        });

        // Optional: Add hover effects
        nextDayButton.on('pointerover', () => {
            nextDayButton.setTint(0x44ff44); // Lighten on hover
        });

        nextDayButton.on('pointerout', () => {
            nextDayButton.clearTint(); // Remove hover effect
        });
    }
}
