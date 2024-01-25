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
        { width: 30, height: 30 }, // Big square
        { width: 20, height: 20 }, // Medium square
        { width: 10, height: 20 }  // Small rectangle
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
        .setData('initialPosition', { x: initialX, y: initialY });
    

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
            
        });

        

        // Set a name for the square
        square.setName(`amplification_${index}_${i+1}`);

        // Store the amplification value in the square's data
        square.setData('amplification', i+1);

        // Dragging logic
        square.on('dragstart', (pointer, dragX, dragY) => {
            // You can change the appearance or set an offset here if needed
        });

        square.on('drag', (pointer, dragX, dragY) => {
            square.x = dragX;
            square.y = dragY;
        });

 // ... rest of your code

 square.on('dragend', (pointer) => {
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
    if (isWithinGridBounds) {
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
});






// ... rest of your code

    });
});


}
checkIfSquareDroppedOnGrid(square) {
    // Check overlap with grid cells and return true if the square is dropped on a valid cell
    // You can use the code from the previous example here to check for overlaps
}
}

