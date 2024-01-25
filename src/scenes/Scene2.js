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
    const verticalSpacing = 20;
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
        // Create the squares at the same y-coordinate as the article title for alignment
        const square = this.add.rectangle(
            squareStartX + i * (size.width + horizontalSpacing), // Adjust x position for each square
            articleY, // Same y-coordinate as the article title for top alignment
            size.width, 
            size.height, 
            0x666666
        ).setOrigin(0, 0) // Set origin to the top-left to align the tops
         .setInteractive();

        this.input.setDraggable(square);

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

        square.on('dragend', (pointer) => {
            // Snap to grid logic here
            // Check if the square's position overlaps with any grid cells
            const droppedOnGrid = this.checkIfSquareDroppedOnGrid(square);
            if (droppedOnGrid) {
                // If dropped on the grid, place it there
                // Update the amplification for the current article
                this.amplifier[index] = square.data.get('amplification');
                console.log(`Amplification for ${title}: ${this.amplifier[index]}`);
            } else {
                // If not dropped on a valid location, reset position
                square.x = square.input.dragStartX;
                square.y = square.input.dragStartY;
            }
        });
    });
});


}
checkIfSquareDroppedOnGrid(square) {
    // Check overlap with grid cells and return true if the square is dropped on a valid cell
    // You can use the code from the previous example here to check for overlaps
}
}

