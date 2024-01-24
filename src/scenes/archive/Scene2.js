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
        this.cellWidth = 50;
        this.cellHeight = 50;
        this.gridRows = 6; // Set the number of rows
        this.gridColumns = 4; // Set the number of columns
        this.grid = [];
        // Calculate grid start position
        let offsetX = 300; // Close to the left border
        let offsetY = (this.cameras.main.height - this.gridRows * this.cellHeight) / 2;

        let graphics = this.add.graphics({ lineStyle: { color: 0xfff } });

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

            // Display titles on the screen
            this.add.text(100, 50 * (index + 1), title, textStyle);

            // Create draggable amplification squares
            const sizes = [15, 30, 45]; // Example sizes for small, medium, and large squares
            sizes.forEach((size, i) => {
                // Create the square
                const square = this.add.rectangle(250 + 100 * i, 50 * (index + 1), size, size, 0x666666)
                    .setOrigin(0.5)
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

