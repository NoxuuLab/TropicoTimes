// BootScene.js
import gameData from './gameData.js';
import { initializeGameState } from './gameCycle.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load the WebFont script
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        // Load assets for the IntroScene
        this.load.image('startButton', 'src/assets/startButton.png'); // Assuming the button image is named startButton.png
        this.load.audio('introMusic', 'src/assets/introMusic.mp3'); // Load the music for the intro scene
    }

    create() {
        // Initialize WebFont Loader
        WebFont.load({
            google: {
                families: ['Roboto Mono', 'PT Mono']
            },
            active: () => {
                this.fontsLoaded();
            }
        });
    }

    fontsLoaded() {
        console.log("Fonts Loaded");

        // Load other assets
        this.load.image('logo', 'src/assets/TROPICO-times.png');
        // Add other assets here like audio, other images, etc.

        this.load.on('complete', () => {
            // Initialize game state
            initializeGameState(gameData);
            console.log('Game data initialized:', gameData);

            // Now that everything is loaded, start the IntroScene
        
            console.log('Starting IntroScene with gameData:', gameData);
            this.scene.start('IntroScene', { gameData: gameData });

        });

        // Start loading the assets
        this.load.start();
    }
}
