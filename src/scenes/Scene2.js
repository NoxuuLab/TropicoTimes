export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    init(data) {
        // Data passed from Scene1
        console.log('Scene 2: Received Data in init:', data.gameData);
        this.gameData = data.gameData;
        this.articlesData = this.gameData.gameState.selected;
        console.log('Scene 2: Selected Data:', this.articlesData);
        this.amplifiers = {}; // Maps article title to its amplifier value
        this.placedSquares = [];
    }

    create() {
        console.log('Scene 2 created!');
        const textStyle = { fontSize: '18px', fill: '#fff' };

        this.cellWidth = 80;
        this.cellHeight = 80;
        this.gridRows = 6; // Set the number of rows
        this.gridColumns = 4; // Set the number of columns
        this.grid = [];
        // Calculate grid start position
        let rightMargin = 20;
        let totalGridWidth = this.cellWidth * this.gridColumns;
        let offsetX = this.cameras.main.width - totalGridWidth - rightMargin;
        let offsetY = (this.cameras.main.height - this.gridRows * this.cellHeight) / 2;

        let graphics = this.add.graphics({ lineStyle: { color: 0xfff, width: 2 } });

        // Create grid cells
        for (let y = 0; y < this.gridRows; y++) {
            for (let x = 0; x < this.gridColumns; x++) {
                let rectX = offsetX + x * this.cellWidth;
                let rectY = offsetY + y * this.cellHeight;
                // Draw cell
                graphics.strokeRect(rectX, rectY, this.cellWidth, this.cellHeight);
                // Create a Rectangle object for each cell for overlap checks
                let cell = new Phaser.Geom.Rectangle(rectX, rectY, this.cellWidth, this.cellHeight);
                this.grid.push(cell);
            }
        }

        // Process each article to create titles and draggable squares
        this.articlesData.forEach((articleData, index) => {
            const title = articleData.headline.title;
            const effect = articleData.headline.effect;
            console.log(`Article ${index + 1}: Title - ${title}, Effect - ${effect}`);

            // Display article titles on the screen
            this.add.text(100, 50 * (index + 1), title, textStyle);

            // Add draggable amplification squares next to each title
            this.addAmplificationSquares(title, effect, index);
        });

        // Add a "Publish" button to the scene
        this.addPublishButton();
    }

    addAmplificationSquares(title, effect, index) {
        const sizes = [
            { width: 10, height: 20, amplification: 1 },
            { width: 20, height: 20, amplification: 2 },
            { width: 30, height: 30, amplification: 3 }
        ];
        
        const squareStartX = 300; // x-coordinate for the first square of each article
        const articleY = 50 * (index + 1);
    
        sizes.forEach((size, i) => {
            const square = this.add.rectangle(
                squareStartX + i * (size.width + 10), articleY,
                size.width, size.height,
                0x666666
            ).setOrigin(0.5).setInteractive().setData('amplification', size.amplification);
    
            this.input.setDraggable(square);
    
            square.on('drag', (pointer, dragX, dragY) => {
                square.x = dragX;
                square.y = dragY;
            });
    
            square.on('dragend', (pointer) => {
                if (this.checkIfSquareDroppedOnGrid(square)) {
                    this.amplifiers[title] = square.getData('amplification');  // Use title as key
                    console.log(`Amplification for article "${title}": ${this.amplifiers[title]}`);
                } else {
                    delete this.amplifiers[title];  // Remove the amplification value if not on grid
                    console.log(`Amplification for article "${title}" removed because it's off the grid.`);
                    square.x = squareStartX + i * (size.width + 10);  // Reset position
                    square.y = articleY;
                }
            });
        });
    }
    

    checkIfSquareDroppedOnGrid(square) {
        let isDropped = this.grid.some(cell => Phaser.Geom.Rectangle.Overlaps(cell, square.getBounds()));
        return isDropped;
    }

    addPublishButton() {
        const publishButton = this.add.text(600, 500, 'Publish', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

        publishButton.on('pointerdown', () => {
            this.publishData();
        });
    }

    publishData() {
        // No need to filter articles now; we will check directly if an amplifier exists for each article
        this.articlesData.forEach((article) => {
            const title = article.headline.title;
            const effect = article.headline.effect;
            const amplifierValue = this.amplifiers[title] || 0;;  // Use title to access the amplifiers
            
            if (amplifierValue !== undefined) {
                article.amplifiedPost = amplifierValue * effect;
                article.amplifierValue = amplifierValue;
            } else {
                article.amplifiedPost = effect;  // Default to the article effect if no amplifier
                article.amplifierValue = 0;      // Default amplifier value when not amplified
            }
        });
        
        // Since we're not filtering, we can directly update the game state
        this.gameData.gameState.selected = this.articlesData;
        console.log('Final data to publish:', this.articlesData);
        
        // Move to Scene3 and pass the updated game data
        this.scene.start('Scene3', { gameData: this.gameData });
    }
    
    
    
}