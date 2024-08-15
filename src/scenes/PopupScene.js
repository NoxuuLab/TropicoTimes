import { goToNextDay } from './gameCycle.js';

export default class PopupScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PopupScene' });
    }

    init(data) {
        this.message = data.message;
        this.gameData = data.gameData;
    }

    create() {
        const popupWidth = 800;
        const popupHeight = 400;
        const popupX = (this.cameras.main.width - popupWidth) / 2;
        const popupY = (this.cameras.main.height - popupHeight) / 2;

        // Create the popup background
        const background = this.add.rectangle(
            popupX + popupWidth / 2,
            popupY + popupHeight / 2,
            popupWidth,
            popupHeight,
            0x000000,
            0.8
        ).setOrigin(0.5);

        // Create the popup text
        const messageText = this.add.text(
            popupX + 20,
            popupY + 50,
            this.message,
            {
                fontSize: '32px',
                fill: '#fff',
                wordWrap: { width: popupWidth - 40 },
                fontFamily: 'Arial',
            }
        );

        // Create the "Next Day" button
        const nextDayButton = this.add.text(
            popupX + popupWidth / 2,
            popupY + popupHeight - 80,
            'Next Day',
            {
                fontSize: '32px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { x: 10, y: 5 },
                border: { color: '#fff', width: 2 },
            }
        ).setOrigin(0.5).setInteractive();

        nextDayButton.on('pointerdown', () => {
            if (this.gameData.gameState.currentDay < this.gameData.gameState.maxDay) {
                goToNextDay(this.gameData);
                this.scene.start('Scene1', { gameData: this.gameData });
            } else {
                this.scene.start('FinishScene');
            }
        });
    }
}
