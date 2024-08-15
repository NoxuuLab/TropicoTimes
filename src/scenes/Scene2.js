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
    preload() {
        // Load assets
        this.load.audio('buttonClick', 'src/assets/buttonClick.mp3'); // Load the button click sound
        this.load.audio('dragSound', 'src/assets/dragSound.mp3'); // Load the dragging sound
        this.load.audio('snapSound', 'src/assets/snapSound.mp3');// Load the snapping sound
        this.load.image('amplifyButton', 'src/assets/amplifyButton.png'); // Load the amplify button image
        this.load.image('TropicoTimes', 'src/assets/TropicoTimes.png');

        
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffff');
        console.log('Scene 2 created!');

             // Adjusted instructional text position

             const introText = `
             Choose the size of the square to amplify the impact of the article.
             Larger squares spread the message further, reaching more of Tropico..`;
               
                     this.add.text(20, 10, introText, {
                         fontFamily: 'Roboto Mono',
                         fontSize: '12px',
                         fill: '#333',
                         align: 'left',
                         wordWrap: { width: 500, useAdvancedWrap: true }
                     });

                

    this.addAmplifyButton();
       
        // Create sound objects
        this.buttonClickSound = this.sound.add('buttonClick');
        this.dragSound = this.sound.add('dragSound');
        this.snapSound = this.sound.add('snapSound');


        const tropicoLogo = this.add.image(400,80, 'TropicoTimes')
        .setScale(0.3)  // Scale the button image to desired size
        .setPosition(620, 50);  // Set the position of the button

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
        const yOffset = 30;
        // Process each article to create titles and draggable squares
        this.articlesData.forEach((articleData, index) => {
            const title = articleData.headline.title;
            const effect = articleData.headline.effect;
            console.log(`Article ${index + 1}: Title - ${title}, Effect - ${effect}`);
        // Create a local copy of the textStyle for mainText and modify it
        let localTextStyle = { ...textStyle.mainText, wordWrap: { width: 330, useAdvancedWrap: true } };
        

        // Display article titles using the modified local textStyle
       
        const yPosition = yOffset + 70 * (index + 1);
        this.add.text(20, yPosition, title, localTextStyle);
        
        
            // Add draggable amplification squares next to each title
            this.addAmplificationSquares(title, effect, index);
        });

        // Add a "Publish" button to the scene
       
    }
    
    addAmplificationSquares(title, effect, index) {
        const sizes = [
            { width: 10, height: 20, amplification: 1 },
            { width: 20, height: 20, amplification: 2 },
            { width: 30, height: 30, amplification: 3 }
        ];
    
        const squareStartX = 350; // x-coordinate for the first square of each article
        const articleY = 70 * (index + 1);
        const currentArticleSquares = []; // Store squares for this article
    
        sizes.forEach((size, i) => {
            const initialX = squareStartX + i * (size.width + 1);
            const initialY = 30 + articleY;
    
            // Create graphics for lines within squares
            let graphics = this.add.graphics({ x: initialX, y: initialY });
            graphics.fillStyle(0xffffff, 3); // white background color
            graphics.fillRect(0, 0, size.width, size.height); // drawing the rectangle
    
          
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
                // Determine the new size based on the amplification value
                const newSize = square.getData('initialWidth') === 30 ? { width: 240, height: 240 } :
                                square.getData('initialWidth') === 20 ? { width: 160, height: 160 } :
                                                                        { width: 80, height: 160 };
                
                // Set the new size for the square
                square.setData('newSize', newSize);
                square.setSize(newSize.width, newSize.height);
                square.setFillStyle(0xf8f8f8); // Light grey to resemble newsprint
        
                // Adjust the border style to make it more distinct
                square.setStrokeStyle(3, 0x333333); // Dark grey border
        
                // Determine font size based on the square size
                const fontSize = newSize.width === 240 ? '32px' : 
                                 newSize.width === 160 ? '24px' : '14px';
        
                // Add text or symbol to the square to make it more like a news article
                const squareText = this.add.text(square.x + 10, square.y + 10, 'TODAY\'S NEWS', {
                    fontFamily: 'Arial Black',
                    fontSize: fontSize,
                    fill: '#000000',
                    fontStyle: 'bold',
                    wordWrap: { width: newSize.width - 20 }
                }).setOrigin(0, 0);
        
                // Store the text reference for later removal
                square.setData('squareText', squareText);
            }
        });
        
        
        // Inside your drag event
        square.on('drag', (pointer, dragX, dragY) => {
            square.x = dragX;
            square.y = dragY;
        
            // Move the text along with the square
            const squareText = square.getData('squareText');
            if (squareText) {
                squareText.setPosition(dragX + 10, dragY + 10);
            }
        
            let isOverlapping = this.placedSquares.some(other => {
                return other !== square && Phaser.Geom.Rectangle.Overlaps(other.getBounds(), square.getBounds());
            });
        
            if (isOverlapping || !this.checkIfSquareDroppedOnGrid(square)) {
                square.setFillStyle(0xff0000); // Red if overlapping or out of bounds
                square.setStrokeStyle(3, 0x990000); // Dark red border to match
            } else {
                square.setFillStyle(0xf8f8f8); // Revert to light grey when valid
                square.setStrokeStyle(3, 0x333333); // Revert to dark grey border
            }
        });
        
        // Inside your dragend event
        square.on('dragend', pointer => {
            const isOverlapping = this.placedSquares.some(other => {
                return other !== square && Phaser.Geom.Rectangle.Overlaps(other.getBounds(), square.getBounds());
            });
            const isOutOfBounds = !this.checkIfSquareDroppedOnGrid(square);
        
            if (isOverlapping || isOutOfBounds) {
                // Reset position, size, and color if overlap or out of bounds
                square.setPosition(square.getData('initialX'), square.getData('initialY'));
                square.setSize(square.getData('initialWidth'), square.getData('initialHeight'));
                square.setFillStyle(0xcccccc); // Reset to default grey color
                square.setStrokeStyle(2, 0xcccccc); // Reset border
        
                // Remove the text if added
                const squareText = square.getData('squareText');
                if (squareText) {
                    squareText.destroy();
                    square.setData('squareText', null);
                }
                square.setData('isPlaced', false);
                delete this.amplifiers[title];
                this.snapSound.play();
            } else {
                // Snap to grid if valid
                const snappedPosition = this.getSnappedPosition(square);
                square.setPosition(snappedPosition.x, snappedPosition.y);
                square.setData('isPlaced', true);
        
                // Keep the text visible and reposition it
                const squareText = square.getData('squareText');
                if (squareText) {
                    squareText.setPosition(snappedPosition.x + 10, snappedPosition.y + 10);
                }
                this.amplifiers[title] = square.getData('amplification'); // Set amplifier
                this.snapSound.play();
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
    
    

    addAmplifyButton() {
        // Create the "Amplify & Publish" button using the image
        const amplifyButton = this.add.image(720, 550, 'amplifyButton')
            .setInteractive({ useHandCursor: true })
            .setScale(0.2)  // Scale the button image to desired size
            .setPosition(720, 520);  // Set the position of the button

            // Set the button to appear above other elements
    amplifyButton.setDepth(100); 
    
        // Add functionality to the button
        amplifyButton.on('pointerdown', () => {
            this.buttonClickSound.play();
            this.publishData();  // Call the existing publishData method
        });
    
        // Add hover effects
        amplifyButton.on('pointerover', () => {
            amplifyButton.setTint(0x44ff44);  // Change color on hover
        });
    
        amplifyButton.on('pointerout', () => {
            amplifyButton.clearTint();  // Revert color when not hovered
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