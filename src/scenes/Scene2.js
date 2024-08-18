import textStyle from '/src/styles/textStyles.js';

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' }); // Scene identifier
    }

    init(data) {
        // Receive and store game data from Scene1
        console.log('Scene 2: Received Data in init:', data.gameData);
        this.gameData = data.gameData;
        this.articlesData = this.gameData.gameState.selected; // Get selected articles
        console.log('Scene 2: Selected Data:', this.articlesData);
        this.amplifiers = {}; // Store amplification values for each article
        this.placedSquares = []; // Track placed amplification squares
    }

    preload() {
        // Load necessary assets for this scene
        this.load.audio('buttonClick', 'src/assets/buttonClick.mp3'); // Button click sound
        this.load.audio('dragSound', 'src/assets/dragSound.mp3'); // Dragging sound
        this.load.audio('snapSound', 'src/assets/snapSound.mp3'); // Snapping sound
        this.load.image('amplifyButton', 'src/assets/amplifyButton.png'); // Amplify button image
        this.load.image('TropicoTimes', 'src/assets/TropicoTimes.png'); // Tropico Times logo
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffff'); // Set background color
        console.log('Scene 2 created!');

        // Display instructional text for the player
        const introText = `
             Choose the size of the square to amplify the impact of the article.
             Larger squares spread the message further, reaching more of Tropico..`;

        this.add.text(20, 10, introText, textStyle.instructionText);

        this.addAmplifyButton(); // Add the amplify button

        // Load sound effects
        this.buttonClickSound = this.sound.add('buttonClick');
        this.dragSound = this.sound.add('dragSound');
        this.snapSound = this.sound.add('snapSound');

        // Display the Tropico Times logo
        const tropicoLogo = this.add.image(400, 80, 'TropicoTimes')
            .setScale(0.3) // Scale the logo
            .setPosition(620, 50); // Position the logo

        // Set up the grid where amplification squares can be placed
        this.cellWidth = 80;
        this.cellHeight = 80;
        this.gridRows = 5;
        this.gridColumns = 4;
        this.grid = [];

        let rightMargin = 20;
        let totalGridWidth = this.cellWidth * this.gridColumns;
        let offsetX = this.cameras.main.width - totalGridWidth - rightMargin;
        let offsetY = (this.cameras.main.height - this.gridRows * this.cellHeight) / 2;

        let graphics = this.add.graphics({ lineStyle: { color: 0xcccccc, width: 2 } });

        // Calculate grid start position and create grid cells
        this.gridOffsetX = offsetX;
        this.gridOffsetY = offsetY;

        for (let y = 0; y < this.gridRows; y++) {
            for (let x = 0; x < this.gridColumns; x++) {
                let rectX = offsetX + x * this.cellWidth;
                let rectY = offsetY + y * this.cellHeight;
                graphics.strokeRect(rectX, rectY, this.cellWidth, this.cellHeight);
                let cell = new Phaser.Geom.Rectangle(rectX, rectY, this.cellWidth, this.cellHeight);
                this.grid.push(cell); // Add cell to grid array
            }
        }

        // Display article titles and add amplification squares
        const yOffset = 30;
        this.articlesData.forEach((articleData, index) => {
            const title = articleData.headline.title;
            const effect = articleData.headline.effect;
            console.log(`Article ${index + 1}: Title - ${title}, Effect - ${effect}`);

            let localTextStyle = { ...textStyle.mainText, wordWrap: { width: 330, useAdvancedWrap: true } };
            const yPosition = yOffset + 70 * (index + 1);
            this.add.text(20, yPosition, title, localTextStyle);

            this.addAmplificationSquares(title, effect, index); // Add squares for this article
        });
    }

    addAmplificationSquares(title, effect, index) {
        // Define sizes and amplification values for the squares
        const sizes = [
            { width: 10, height: 20, amplification: 1 },
            { width: 20, height: 20, amplification: 2 },
            { width: 30, height: 30, amplification: 3 }
        ];

        const squareStartX = 350; // Starting x-coordinate for squares
        const articleY = 70 * (index + 1);
        const currentArticleSquares = []; // Store squares for this article

        // Create draggable amplification squares
        sizes.forEach((size, i) => {
            const initialX = squareStartX + i * (size.width + 1);
            const initialY = 30 + articleY;

            let graphics = this.add.graphics({ x: initialX, y: initialY });
            graphics.fillStyle(0xffffff, 3); // White background color
            graphics.fillRect(0, 0, size.width, size.height); // Draw the square

            const square = this.add.rectangle(
                initialX, initialY,
                size.width, size.height,
                0xcccccc, 0 // Light gray color
            ).setOrigin(0, 0)
              .setInteractive()
              .setStrokeStyle(2, 0xcccccc) // Add border
              .setData('amplification', size.amplification)
              .setData('initialX', initialX)
              .setData('initialY', initialY)
              .setData('initialWidth', size.width)
              .setData('initialHeight', size.height)
              .setData('title', title);

            currentArticleSquares.push(square);
            this.placedSquares.push(square); // Track all squares
            this.input.setDraggable(square);

            // Add drag and drop functionality to the squares
            square.on('pointerdown', () => {
                if (!square.getData('isPlaced')) {
                    const newSize = square.getData('initialWidth') === 30 ? { width: 240, height: 240 } :
                                    square.getData('initialWidth') === 20 ? { width: 160, height: 160 } :
                                                                            { width: 80, height: 160 };

                    square.setData('newSize', newSize);
                    square.setSize(newSize.width, newSize.height);
                    square.setFillStyle(0xf8f8f8); // Light grey to resemble newsprint

                    square.setStrokeStyle(3, 0x333333); // Dark grey border

                    const fontSize = newSize.width === 240 ? '32px' :
                                     newSize.width === 160 ? '24px' : '14px';

                    const squareText = this.add.text(square.x + 10, square.y + 10, 'TODAY\'S NEWS', {
                        fontFamily: 'Arial Black',
                        fontSize: fontSize,
                        fill: '#000000',
                        fontStyle: 'bold',
                        wordWrap: { width: newSize.width - 20 }
                    }).setOrigin(0, 0);

                    square.setData('squareText', squareText); // Store reference to text
                }
            });

            square.on('drag', (pointer, dragX, dragY) => {
                square.x = dragX;
                square.y = dragY;

                const squareText = square.getData('squareText');
                if (squareText) {
                    squareText.setPosition(dragX + 10, dragY + 10);
                }

                let isOverlapping = this.placedSquares.some(other => {
                    return other !== square && Phaser.Geom.Rectangle.Overlaps(other.getBounds(), square.getBounds());
                });

                if (isOverlapping || !this.checkIfSquareDroppedOnGrid(square)) {
                    square.setFillStyle(0xff0000); // Red if overlapping or out of bounds
                    square.setStrokeStyle(3, 0x990000); // Dark red border
                } else {
                    square.setFillStyle(0xf8f8f8); // Revert to light grey when valid
                    square.setStrokeStyle(3, 0x333333); // Revert to dark grey border
                }
            });

            square.on('dragend', pointer => {
                const isOverlapping = this.placedSquares.some(other => {
                    return other !== square && Phaser.Geom.Rectangle.Overlaps(other.getBounds(), square.getBounds());
                });
                const isOutOfBounds = !this.checkIfSquareDroppedOnGrid(square);

                if (isOverlapping || isOutOfBounds) {
                    square.setPosition(square.getData('initialX'), square.getData('initialY'));
                    square.setSize(square.getData('initialWidth'), square.getData('initialHeight'));
                    square.setFillStyle(0xcccccc); // Reset to default grey color
                    square.setStrokeStyle(2, 0xcccccc); // Reset border

                    const squareText = square.getData('squareText');
                    if (squareText) {
                        squareText.destroy();
                        square.setData('squareText', null);
                    }
                    square.setData('isPlaced', false);
                    delete this.amplifiers[title];
                    this.snapSound.play();
                } else {
                    const snappedPosition = this.getSnappedPosition(square);
                    square.setPosition(snappedPosition.x, snappedPosition.y);
                    square.setData('isPlaced', true);

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
        // Check if the square is within grid bounds
        const bounds = square.getBounds();
        return bounds.x >= this.gridOffsetX &&
               bounds.y >= this.gridOffsetY &&
               bounds.right <= this.gridOffsetX + this.cellWidth * this.gridColumns &&
               bounds.bottom <= this.gridOffsetY + this.cellHeight * this.gridRows;
    }

    getSnappedPosition(square) {
        // Snap the square to the nearest grid position
        let snappedX = Phaser.Math.Snap.To(square.x - this.gridOffsetX, this.cellWidth) + this.gridOffsetX;
        let snappedY = Phaser.Math.Snap.To(square.y - this.gridOffsetY, this.cellHeight) + this.gridOffsetY;

        snappedX = Phaser.Math.Clamp(snappedX, this.gridOffsetX, this.gridOffsetX + this.cellWidth * (this.gridColumns - 1));
        snappedY = Phaser.Math.Clamp(snappedY, this.gridOffsetY, this.gridOffsetY + this.cellHeight * this.gridRows);

        return { x: snappedX, y: snappedY };
    }

    addAmplifyButton() {
        // Create the "Amplify & Publish" button
        const amplifyButton = this.add.image(720, 550, 'amplifyButton')
            .setInteractive({ useHandCursor: true })
            .setScale(0.2) // Scale the button image
            .setPosition(720, 520); // Position the button

        amplifyButton.setDepth(100); // Set button depth

        // Handle button click
        amplifyButton.on('pointerdown', () => {
            this.buttonClickSound.play();
            this.publishData(); // Call the publishData method
        });

        // Add hover effects
        amplifyButton.on('pointerover', () => {
            amplifyButton.setTint(0x44ff44); // Change color on hover
        });

        amplifyButton.on('pointerout', () => {
            amplifyButton.clearTint(); // Revert color when not hovered
        });
    }

    publishData() {
        // Calculate the final impact of each article based on amplification
        this.articlesData.forEach((article) => {
            const title = article.headline.title;
            const effect = article.headline.effect;
            const amplifierValue = this.amplifiers[title] || 0; // Get amplifier value

            if (amplifierValue !== undefined) {
                article.amplifiedPost = amplifierValue * effect;
                article.amplifierValue = amplifierValue;
            } else {
                article.amplifiedPost = effect; // Default to the article effect if no amplifier
                article.amplifierValue = 0; // Default amplifier value when not amplified
            }
        });

        // Update the game state with the amplified articles
        this.gameData.gameState.selected = this.articlesData;
        console.log('Final data to publish:', this.articlesData);

        // Move to Scene3 with the updated game data
        this.scene.start('Scene3', { gameData: this.gameData });
    }
}
