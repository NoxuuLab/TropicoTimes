export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    init(data) {
        // Data passed from Scene1
        console.log('Scene 2: Received Data in init:', data.gameData);
        this.gameData = data.gameData;
        this.articlesData = this.gameData.gameState.selected;
        // Log the selected data
        console.log('Scene 2: Selected Data:', this.articlesData);
        this.amplifiers = {}; // Maps article title to its amplifier value
        this.placedSquares = [];


    }
    create() {
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

        // Display the titles on the screen and create draggable amplification squares

this.articlesData.forEach((articleData, index) => {
    const title = articleData.headline.title;
    const textStyle = { fontSize: '18px', fill: '#fff' };

    // Calculate the y position for this article title and squares
    // You can adjust 'verticalSpacing' to increase the space between rows if needed
    const verticalSpacing = 40;
    let articleY = verticalSpacing + (this.cellHeight + verticalSpacing) * index;

    // Display article titles on the screen at a fixed x-coordinate
    // 'articleX' is the x-coordinate for all the article titles
    const articleX = 100;
    this.add.text(articleX, articleY, title, textStyle);

    // Create draggable amplification squares
    // 'squareStartX' is the x-coordinate for the first square of each article
    // It must be to the right of the longest possible article title
    const squareStartX = 300; // You can adjust this to ensure squares are placed correctly
    const sizes = [
        { width: 10, height: 20, amplification: 1 },
        { width: 20, height: 20, amplification: 2 },
        { width: 30, height: 30, amplification: 3 } // Large square
         // Medium square
         // Small rectangle
    ];
    const horizontalSpacing = 10; // Space between squares

    sizes.forEach((size, i) => {
        // Calculate initial position for each square
        const initialX = squareStartX + i * (size.width + horizontalSpacing);
        const initialY = articleY;
    
        // Create the squares at the same y-coordinate as the article title for alignment
        const square = this.add.rectangle(
            initialX,
            initialY, 
            size.width, 
            size.height, 
            0x666666
        )
        .setOrigin(0, 0) // Set origin to the top-left to align the tops
        .setInteractive()
        .setData('initialSize', { width: size.width, height: size.height })
        .setData('initialPosition', { x: initialX, y: initialY })
        .setData('articleTitle', title) // Attach the article's title to the square
        .setData('amplification', size.amplification); // Use the amplification value from the size object


        this.input.setDraggable(square);

        // Add a pointerdown event listener to the square
        square.on('pointerdown', function () {
            // Set the square's new size based on which square it is
            // The origin remains at the top-left corner (0, 0)
            if (this.width === 30 && this.height === 30) {
                this.setData('newSize', { width: 240, height: 240 });
            } else if (this.width === 20 && this.height === 20) {
                this.setData('newSize', { width: 160, height: 160 });
            } else if (this.width === 10 && this.height === 20) {
                this.setData('newSize', { width: 80, height: 160 });
            }
            // Expand the square visually to the new size
            this.setSize(this.data.get('newSize').width, this.data.get('newSize').height);
            
            // Retrieve the article's title or identifier from the square
            const articleTitle = square.getData('articleTitle');
            console.log(`DragEnd Amplification for ${square.getData('articleTitle')}: ${square.getData('amplification')}`);
          
        });

  
        // Store the amplification value in the square's data
      

        // Dragging logic
        square.on('dragstart', (pointer, dragX, dragY) => {
            square.setData('isOverlapping', false); 
        });

        square.on('drag', (pointer, dragX, dragY) => {
            let isOverlapping = false;
            
        square.setData('isOverlapping', isOverlapping);
            // Temporarily update square's position
            square.x = dragX;
            square.y = dragY;
        
       
            const draggedSquareBounds = square.getBounds();
        
            // Now, check against all placed squares using the updated bounds
            this.placedSquares.forEach(placedSquare => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(draggedSquareBounds, placedSquare.getBounds())) {
                    isOverlapping = true;
                }
            });
        
            if (isOverlapping) {
                square.setFillStyle(0xff0000); // Red if overlapping
            } else {
                square.setFillStyle(0x666666); // Original color if not
            }
        });
        
        

 // ... rest of your code

 square.on('dragend', (pointer) => {
    let isOverlapping = square.getData('isOverlapping');

    // Assuming 'this' refers to the scene context where the grid properties are defined
    let offsetX = this.cameras.main.width - this.cellWidth * this.gridColumns - rightMargin;
    let offsetY = (this.cameras.main.height - this.gridRows * this.cellHeight) / 2;

    // Calculate the position relative to the grid's top-left corner
    let relativeX = pointer.x - offsetX - square.displayWidth * square.originX;
    let relativeY = pointer.y - offsetY - square.displayHeight * square.originY;

    // Snap to the nearest cell
    let snappedX = Phaser.Math.Snap.To(relativeX, this.cellWidth);
    let snappedY = Phaser.Math.Snap.To(relativeY, this.cellHeight);

    // Make sure the snapped position isn't outside the grid boundaries
    snappedX = Math.min(snappedX, this.cellWidth * (this.gridColumns - 1));
    snappedY = Math.min(snappedY, this.cellHeight * (this.gridRows - 1));

    // Adjust back to absolute positioning considering the square's origin
    snappedX += offsetX + square.displayWidth * square.originX;
    snappedY += offsetY + square.displayHeight * square.originY;

    // Update the position of the square to the snapped position
    square.x = snappedX;
    square.y = snappedY;

    // Check if the snapped position is within the grid boundaries
    let isWithinGridBounds =
        snappedX >= offsetX &&
        snappedX + square.width <= offsetX + totalGridWidth &&
        snappedY >= offsetY &&
        snappedY + square.height <= offsetY + this.cellHeight * this.gridRows;

    // If the square can fit entirely within the grid cell, snap it into place
    if (isWithinGridBounds && !isOverlapping) {
        // If not overlapping, proceed to add the square to placed squares
        this.placedSquares.push(square);
        square.setFillStyle(0x666666);
        // Set the top-left corner of the square to the snapped position
        square.x = snappedX;
        square.y = snappedY;
    } else {
        // If the square cannot fit within the grid, reset to its initial position and size
        const initialSize = square.data.get('initialSize');
        const initialPosition = square.data.get('initialPosition');

        square.setSize(initialSize.width, initialSize.height);
        square.setDisplaySize(initialSize.width, initialSize.height);
        square.setPosition(initialPosition.x, initialPosition.y);
        // The origin is already at the top-left corner
    }

    // Check if the square was dropped on the grid and handle amplification logic
    if (this.checkIfSquareDroppedOnGrid(square)) {
        const articleTitle = square.getData('articleTitle');
        console.log(`Amplification for ${articleTitle}: ${square.getData('amplification')}`);
    }
});







// ... rest of your code

    });
});


const publishButton = this.add.text(600, 500, 'Publish', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive();

        // Handle the "Publish" button click
        publishButton.on('pointerdown', () => {
            // Prepare data to pass to Scene3
            const publishData = this.articlesData.map((articleData) => {
                const title = articleData.headline.title;
                const effect = articleData.effect; // Ensure you have this data
                const amplifierValue = this.amplifiers[title] || 1; // Default to 1 if no amplifier set
                const amplifiedPost = amplifierValue * effect;

                return {
                    title: title,
                    effect: effect,
                    amplifierValue: amplifierValue,
                    amplifiedPost: amplifiedPost,
                };
            });

            // Switch to Scene3, passing along the prepared data
            this.scene.start('Scene3', { gameData: this.gameData });
        });
}


checkIfSquareDroppedOnGrid(square) {
    // Check overlap with grid cells and return true if the square is dropped on a valid cell
    // You can use the code from the previous example here to check for overlaps
    console.log(`Drop Check Amplification for ${square.getData('articleTitle')}: ${square.getData('amplification')}`);
        let droppedOnGrid = false;
        let squareBounds = new Phaser.Geom.Rectangle(square.x, square.y, square.width, square.height);
        // Assuming 'this.grid' contains your grid cell definitions
        this.grid.forEach((cell) => {
            if (Phaser.Geom.Rectangle.Overlaps(cell, squareBounds)) {
                droppedOnGrid = true;
    
                // Assuming square.data contains 'articleTitle'
                const articleTitle = square.data.get('articleTitle');
    
                // Update the amplifier value based on the size of the square
                // This assumes you have a way to determine the amplifier value from the square
                // For example, using square size or a data attribute you've set
                let amplifierValue = square.data.get('amplification'); // Or calculate based on size
    
                // Update the amplifier value in your tracking object
                this.amplifiers[articleTitle] = amplifierValue;

            }
        });
    
        if (!droppedOnGrid) {
            // Logic to reset the square's position or handle invalid drops
            console.log("Square not dropped on a valid grid cell.");
            return false;
        }
    
        // The square can be placed on the grid without overlap
        return true;
    }
    
}


