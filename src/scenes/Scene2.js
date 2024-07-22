import textStyle from '/src/styles/textStyles.js';
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
        this.cameras.main.setBackgroundColor('#ffffff');
        console.log('Scene 2 created!');

        this.cellWidth = 80;
        this.cellHeight = 80;
        this.gridRows = 5; // Set the number of rows
        this.gridColumns = 4; // Set the number of columns
        this.grid = [];
        // Calculate grid start position
        let rightMargin = 20;
        let totalGridWidth = this.cellWidth * this.gridColumns;
        let offsetX = this.cameras.main.width - totalGridWidth - rightMargin;
        let offsetY = (this.cameras.main.height - this.gridRows * this.cellHeight) / 2;

        let graphics = this.add.graphics({ lineStyle: { color: 0xcccccc, width: 2 } });

        // In your create method
        this.gridOffsetX = offsetX;
        this.gridOffsetY = offsetY;

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
        // Create a local copy of the textStyle for mainText and modify it
        let localTextStyle = { ...textStyle.mainText, wordWrap: { width: 300, useAdvancedWrap: true } };

        // Display article titles using the modified local textStyle
        this.add.text(40, 100 * (index + 1), title, localTextStyle);
        
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
    
        const squareStartX = 350; // x-coordinate for the first square of each article
        const articleY = 100 * (index + 1);
        const currentArticleSquares = []; // Store squares for this article
    
        sizes.forEach((size, i) => {
            const initialX = squareStartX + i * (size.width + 3);
            const initialY = articleY;
    
            // Create graphics for lines within squares
            let graphics = this.add.graphics({ x: initialX, y: initialY });
            graphics.fillStyle(0xffffff, 1); // white background color
            graphics.fillRect(0, 0, size.width, size.height); // drawing the rectangle
    
            // Drawing horizontal gray lines to simulate text
            graphics.lineStyle(1, 0xcccccc, 1); // light gray color and full opacity for lines
            for (let lineY = 4; lineY < size.height; lineY += 4) { // line spacing
                graphics.moveTo(0, lineY);
                graphics.lineTo(size.width, lineY);
            }
            graphics.strokePath();
    
            // Create the interactive rectangle
            const square = this.add.rectangle(
                initialX, initialY,
                size.width, size.height,
                0xcccccc, 0 
            ).setOrigin(0, 0)
              .setInteractive()
              .setStrokeStyle(2, 0xcccccc) // adding a light gray border for better visual clarity
              .setData('amplification', size.amplification)
              .setData('initialX', initialX)
              .setData('initialY', initialY)
              .setData('initialWidth', size.width)
              .setData('initialHeight', size.height)
              .setData('title', title);
    
            currentArticleSquares.push(square);
            this.placedSquares.push(square); // Track all squares
            this.input.setDraggable(square);
        // Set the color and size when a square is picked up
        square.on('pointerdown', () => {
            if (!square.getData('isPlaced')) {
                const newSize = square.getData('initialWidth') === 30 ? { width: 240, height: 240 } :
                                square.getData('initialWidth') === 20 ? { width: 160, height: 160 } :
                                                                        { width: 80, height: 160 };
                square.setData('newSize', newSize);
                square.setSize(newSize.width, newSize.height);
            }
            currentArticleSquares.forEach(sq => {
                if (sq !== square && sq.getData('isPlaced')) {
                    sq.setSize(sq.getData('initialWidth'), sq.getData('initialHeight'));
                    sq.setPosition(sq.getData('initialX'), sq.getData('initialY'));
                    sq.setData('isPlaced', false);
                    delete this.amplifiers[title];
                    sq.setFillStyle(0x666666); // Reset color
                }
            });
        });

        // Update the color in real-time during dragging based on position validity
        square.on('drag', (pointer, dragX, dragY) => {
            square.x = dragX;
            square.y = dragY;
            let isOverlapping = this.placedSquares.some(other => {
                return other !== square && Phaser.Geom.Rectangle.Overlaps(other.getBounds(), square.getBounds());
            });
            if (isOverlapping || !this.checkIfSquareDroppedOnGrid(square)) {
                square.setFillStyle(0xff0000); // Red if overlapping or out of bounds
            } else {
                square.setFillStyle(0x666666); // Revert to normal color
            }
        });

        // Handle the drop event to either reset or confirm the square's position
        square.on('dragend', pointer => {
            const isOverlapping = this.placedSquares.some(other => {
                return other !== square && Phaser.Geom.Rectangle.Overlaps(other.getBounds(), square.getBounds());
            });
            const isOutOfBounds = !this.checkIfSquareDroppedOnGrid(square);

            if (isOverlapping || isOutOfBounds) {
                // Reset position and size if overlap or out of bounds
                square.setPosition(square.getData('initialX'), square.getData('initialY'));
                square.setSize(square.getData('initialWidth'), square.getData('initialHeight'));
                square.setFillStyle(0x666666); // Reset color
                square.setData('isPlaced', false);
                delete this.amplifiers[title];
            } else {
                // Snap to grid if valid and mark as placed
                const snappedPosition = this.getSnappedPosition(square);
                square.setPosition(snappedPosition.x, snappedPosition.y);
                square.setData('isPlaced', true);
                if (!square.getData('newSize')) {
                    // Maintain current size if newSize isn't set
                    square.setSize(square.width, square.height);
                } else {
                    // Use the newSize data to set the size of the square
                    const newSize = square.getData('newSize');
                    square.setSize(newSize.width, newSize.height);
                }
                this.amplifiers[title] = square.getData('amplification'); // Set amplifier
            }
        });
    });
}

    
    
    
    checkIfSquareDroppedOnGrid(square) {
        const bounds = square.getBounds();
        return bounds.x >= this.gridOffsetX &&
               bounds.y >= this.gridOffsetY &&
               bounds.right <= this.gridOffsetX + this.cellWidth * this.gridColumns &&
               bounds.bottom <= this.gridOffsetY + this.cellHeight * this.gridRows;
    }
    
    getSnappedPosition(square) {
        // Calculate the snapped position based on the square's top-left corner
        let snappedX = Phaser.Math.Snap.To(square.x - this.gridOffsetX, this.cellWidth) + this.gridOffsetX;
        let snappedY = Phaser.Math.Snap.To(square.y - this.gridOffsetY, this.cellHeight) + this.gridOffsetY;
    
        // Ensure the snapped position does not exceed the grid boundaries
        snappedX = Phaser.Math.Clamp(snappedX, this.gridOffsetX, this.gridOffsetX + this.cellWidth * (this.gridColumns - 1));
        snappedY = Phaser.Math.Clamp(snappedY, this.gridOffsetY, this.gridOffsetY + this.cellHeight * (this.gridRows - 1));
    
        // Adjust for the origin being at the top-left corner of the square
        snappedX = Math.max(snappedX, this.gridOffsetX);
        snappedY = Math.max(snappedY, this.gridOffsetY);
    
        return { x: snappedX, y: snappedY };
    }
    
    

    addPublishButton() {
        const publishButton = this.add.text(700, 550, 'Publish', textStyle.publishButton)
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