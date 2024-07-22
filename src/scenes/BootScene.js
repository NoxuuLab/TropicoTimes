// BootScene.js
// BootScene.js
import gameData from './gameData.js';
import { initializeGameState } from './gameCycle.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // First, load the WebFont script
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        // Once the script is loaded, initialize WebFont Loader
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
        // Log that fonts are loaded
        console.log("Fonts Loaded");

        // Continue to load other assets
        this.load.image('logo', 'src/assets/TROPICO-times.png');
        // Add other assets here like audio, other images, etc.

        // Listener for when all assets are loaded
        this.load.on('complete', () => {
            // Initialize game state
            initializeGameState(gameData);
            console.log('Starting Scene1 with gameData:', gameData);

            // Now that everything is loaded, start Scene1
            this.scene.start('Scene1', { gameData: gameData });
        });

        // Start the actual asset loading process
        this.load.start();
    }
}
