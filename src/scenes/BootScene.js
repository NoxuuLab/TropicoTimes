import gameData from './gameData.js';
import { initializeGameState } from './gameCycle.js';

// Initial scene to load essential assets and initialize game state
export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' }); // Scene identifier
    }

    preload() {
        // Load necessary scripts and assets for the game
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('startButton', 'src/assets/startButton.png'); // Start button image
        this.load.audio('introMusic', 'src/assets/introMusic.mp3'); // Intro scene music
    }

    create() {
        // Load custom fonts and proceed once ready
        WebFont.load({
            google: { families: ['Roboto Mono', 'PT Mono'] },
            active: () => this.fontsLoaded() // Move to next step when fonts are ready
        });
    }

    fontsLoaded() {
        // Play the intro music and loop it
        const music = this.sound.add('introMusic', { loop: true, volume: 0.5 });
        music.play();

        // Store the music globally so it can continue playing across scenes
        this.sound.pauseOnBlur = false;  // Ensures music continues if the game loses focus
        this.game.backgroundMusic = music;

        // Load additional assets and initialize game state
        this.load.image('logo', 'src/assets/TropicoTimes.png'); // Game logo
        this.load.on('complete', () => {
            initializeGameState(gameData); // Set up game data
            this.scene.start('IntroScene', { gameData: gameData }); // Start intro scene
        });
        this.load.start(); // Begin asset loading
    }
}
