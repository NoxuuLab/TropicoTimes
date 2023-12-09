export default class ChooseArticle extends Phaser.Scene {
  constructor() {
    super({ key: 'ChooseArticle' });
  }

  preload() {
    this.load.image('background', 'src/assets/introductionScene/background.png');
    this.load.image('small', 'src/assets/introductionScene/small_article.png');
    this.load.image('medium', 'src/assets/introductionScene/medium_article.png');
    this.load.image('large', 'src/assets/introductionScene/large_article.png');
  }

  create() {
    this.cameras.main.setPosition(0, 0);
    this.cameras.main.setOrigin(0, 0);


    // Add background image
    this.add.image(400, 300, 'background');

    // Create a grid
    var gridSizeX = 4;
    var gridSizeY = 5;
    var tileSizeX = 400 / gridSizeX;
    var tileSizeY = 500 / gridSizeY;

    for (let i = 0; i < gridSizeX; i++) {
      for (let j = 0; j < gridSizeY; j++) {
        // Calculate the position of each grid cell
        var x = i * tileSizeX + tileSizeX / 2;
        var y = j * tileSizeY + tileSizeY / 2;

        // Draw a rectangle to represent each grid cell with a white stroke
        this.add.rectangle(x, y, tileSizeX, tileSizeY, 0x000000).setStrokeStyle(2, 0xffffff);
      }
    }

// Calculate the grid boundaries
var gridBounds = {
  minX: 1,
  maxX: 400,
  minY: 1,
  maxY: 500,
};

// Draw a Rectangle around the Grid Boundaries
this.add.rectangle(
  gridBounds.minX + (gridBounds.maxX - gridBounds.minX) / 2,  // x-coordinate of the center: (400 - 0) / 2 + 0 = 200
  gridBounds.minY + (gridBounds.maxY - gridBounds.minY) / 2,  // y-coordinate of the center: (500 - 0) / 2 + 0 = 250
  gridBounds.maxX - gridBounds.minX,                          // Width of the rectangle: 400 - 0 = 400
  gridBounds.maxY - gridBounds.minY                           // Height of the rectangle: 500 - 0 = 500
).setStrokeStyle(3, 0xff0000);  // Set white stroke with a width of 2 pixels and red color

    // Add articles
    var smallArticle = this.add.image(800, 150, 'small').setInteractive({ draggable: true });
    var mediumArticle = this.add.image(800, 300, 'medium').setInteractive({ draggable: true });
    var largeArticle = this.add.image(800, 450, 'large').setInteractive({ draggable: true });

    // Enable drag events for articles
    this.input.setDraggable(smallArticle);
    this.input.setDraggable(mediumArticle);
    this.input.setDraggable(largeArticle);

    
  // Store the original positions in the article's data
    smallArticle.setData('originalX', smallArticle.x);
    smallArticle.setData('originalY', smallArticle.y);

    mediumArticle.setData('originalX', mediumArticle.x);
    mediumArticle.setData('originalY', mediumArticle.y);

    largeArticle.setData('originalX', largeArticle.x);
    largeArticle.setData('originalY', largeArticle.y);


    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff0000);
      gameObject.setData('originalX', gameObject.x);
      gameObject.setData('originalY', gameObject.y);
    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      // Update position while dragging
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

this.input.on('dragend', function (pointer, gameObject) {
    gameObject.clearTint();

     // Get the original positions from the article's data
    const originalX = gameObject.getData('originalX');
    const originalY = gameObject.getData('originalY');

      // Log current positions and dimensions for debugging
  console.log('gameObject.x:', gameObject.x);
  console.log('gameObject.y:', gameObject.y);
  console.log('originalX:', originalX);
  console.log('originalY:', originalY);

  // Log values for debugging
  console.log('gameObject.y:', gameObject.y);

 

    // Check if the article is within the boundaries of the grid
    if (
      gameObject.x >= gridBounds.minX && gameObject.x <= gridBounds.maxX &&
      gameObject.y >= gridBounds.minY && gameObject.y <= gridBounds.maxY
    ) {
      // Snap to grid only if within boundaries
      if (gameObject.texture.key === 'small') {
        this.snapSmallToGrid(gameObject, tileSizeX, tileSizeY, 1);
      } else if (gameObject.texture.key === 'medium') {
        this.snapMediumToGrid(gameObject, tileSizeX, tileSizeY, 1);
      } else if (gameObject.texture.key === 'large') {
        this.snapLargeToGrid(gameObject, tileSizeX, tileSizeY, 1);
      }
    } else {
      // Reset position if outside boundaries
      gameObject.x = originalX;
      gameObject.y = originalY;
    }
  }, this);
}

 // Function to snap a small article to the grid lines with 2 squares size
 snapSmallToGrid(gameObject, tileSizeX, tileSizeY, precision) {
  // Calculate the snapped position based on the size of the article
  var snappedX = Math.round(gameObject.x / tileSizeX / precision) * tileSizeX-50; // Snap from the left corner
  var snappedY = Math.round(gameObject.y / tileSizeY / precision) * tileSizeY; // Snap from the top corner

  // Set the snapped position
  gameObject.x = snappedX;
  gameObject.y = snappedY;

  
}

// Function to snap a large article to the grid lines
snapMediumToGrid(gameObject, tileSizeX, tileSizeY, precision) {
  // Adjust this function based on the characteristics of large articles
  var snappedX = Math.round(gameObject.x / tileSizeX / precision) * tileSizeX;
  var snappedY = Math.round(gameObject.y / tileSizeY / precision) * tileSizeY;

  gameObject.x = snappedX;
  gameObject.y = snappedY;
}

// Function to snap a large article to the grid lines
snapLargeToGrid(gameObject, tileSizeX, tileSizeY, precision) {
  // Adjust this function based on the characteristics of large articles
  var snappedX = Math.round(gameObject.x / tileSizeX / precision) * tileSizeX-50;
  var snappedY = Math.round(gameObject.y / tileSizeY / precision) * tileSizeY-50;

  gameObject.x = snappedX;
  gameObject.y = snappedY;
}
}

