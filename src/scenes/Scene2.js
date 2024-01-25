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
    square.on('pointerdown', () => {
        // Define new sizes for the squares
        let newSize;
        if (square.width === 30 && square.height === 30) {
            newSize = { width: 240, height: 240 }; // New size for large square
        } else if (square.width === 20 && square.height === 20) {
            newSize = { width: 160, height: 160 }; // New size for medium square
        } else if (square.width === 10 && square.height === 20) {
            newSize = { width: 80, height: 160 }; // New size for small rectangle
        }
        
        // Apply the new size to the square
        square.setSize(newSize.width, newSize.height);
        square.setDisplaySize(newSize.width, newSize.height);

        // You may need to adjust the origin or position if needed
        square.setOrigin(0.5); // This centers the origin on the square - adjust as needed
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
    let snapped = false;

    // Loop through each cell in the grid
    for (let cell of this.grid) {
        // Calculate the snapped position for the top-left corner of the square
        let snappedTopLeftX = Phaser.Math.Snap.To(pointer.x - square.displayWidth * 0.5, this.cellWidth) + this.cellWidth * 0.5;
        let snappedTopLeftY = Phaser.Math.Snap.To(pointer.y - square.displayHeight * 0.5, this.cellHeight) + this.cellHeight * 0.5;

        // Calculate the bounds of the square with the snapped positions
        let squareBounds = new Phaser.Geom.Rectangle(
            snappedTopLeftX - square.displayWidth * 0.5,
            snappedTopLeftY - square.displayHeight * 0.5,
            square.displayWidth,
            square.displayHeight
        );

        // Check if the snapped position would keep the square entirely within the grid bounds
        let isWithinGridBounds =
            squareBounds.left >= offsetX &&
            squareBounds.right <= offsetX + totalGridWidth &&
            squareBounds.top >= offsetY &&
            squareBounds.bottom <= offsetY + this.cellHeight * this.gridRows;

        // Only snap the square into place if it fits entirely within the grid
        if (isWithinGridBounds) {
            // Adjust the square's position to the snapped coordinates
            square.x = snappedTopLeftX;
            square.y = snappedTopLeftY;
            snapped = true;
            break; // Exit the loop as we've snapped to a cell
        }
    }

    // If the square wasn't snapped to a grid cell, reset its position and size
    if (!snapped) {
        // Reset to initial size and position if it doesn't fit within the grid
        const initialSize = square.data.get('initialSize');
        square.setSize(initialSize.width, initialSize.height);
        square.setDisplaySize(initialSize.width, initialSize.height);

        const initialPosition = square.data.get('initialPosition');
        square.x = initialPosition.x;
        square.y = initialPosition.y;

        square.setOrigin(0, 0); // Reset the origin if it has been changed
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

