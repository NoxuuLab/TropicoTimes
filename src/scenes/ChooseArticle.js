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

    // Add articles
    var smallArticle = this.add.image(800, 150, 'small').setInteractive({ draggable: true });
    var mediumArticle = this.add.image(800, 300, 'medium').setInteractive({ draggable: true });
    var largeArticle = this.add.image(800, 450, 'large').setInteractive({ draggable: true });

    // Enable drag events for articles
    this.input.setDraggable(smallArticle);
    this.input.setDraggable(mediumArticle);
    this.input.setDraggable(largeArticle);

 // Add event listeners for drag events
 this.input.on('dragstart', function (pointer, gameObject) {
  gameObject.setTint(0xff0000);
});

this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
  // Update position while dragging
  gameObject.x = dragX;
  gameObject.y = dragY;
});

this.input.on('dragend', function (pointer, gameObject) {
  gameObject.clearTint();
  if (gameObject.texture.key === 'small') {
    this.snapSmallToGrid(gameObject, tileSizeX, tileSizeY);
  } else if (gameObject.texture.key === 'medium') {
    this.snapMediumToGrid(gameObject, tileSizeX, tileSizeY);
  } else if (gameObject.texture.key === 'large') {
    this.snapLargeToGrid(gameObject, tileSizeX, tileSizeY);
  }
}, this);
}

 // Function to snap a small article to the grid lines with 2 squares size
 snapSmallToGrid(gameObject, tileSizeX, tileSizeY, articleWidth, articleHeight) {
  // Calculate the snapped position based on the size of the article
  var snappedX = Math.round(gameObject.x / tileSizeX) * tileSizeX-50; // Snap from the left corner
  var snappedY = Math.round(gameObject.y / tileSizeY) * tileSizeY; // Snap from the top corner

  // Set the snapped position
  gameObject.x = snappedX;
  gameObject.y = snappedY;
}

// Function to snap a large article to the grid lines
snapMediumToGrid(gameObject, tileSizeX, tileSizeY) {
  // Adjust this function based on the characteristics of large articles
  var snappedX = Math.round(gameObject.x / tileSizeX) * tileSizeX;
  var snappedY = Math.round(gameObject.y / tileSizeY) * tileSizeY;


  // Log values for debugging
  console.log('gameObject.y:', gameObject.y);
  console.log('tileSizeY:', tileSizeY);
  console.log('snappedY:', snappedY);
  console.log('snappedX:', snappedX);

  gameObject.x = snappedX;
  gameObject.y = snappedY;
}

// Function to snap a large article to the grid lines
snapLargeToGrid(gameObject, tileSizeX, tileSizeY) {
  // Adjust this function based on the characteristics of large articles
  var snappedX = Math.round(gameObject.x / tileSizeX) * tileSizeX-50;
  var snappedY = Math.round(gameObject.y / tileSizeY) * tileSizeY-50;

  gameObject.x = snappedX;
  gameObject.y = snappedY;
}
}

