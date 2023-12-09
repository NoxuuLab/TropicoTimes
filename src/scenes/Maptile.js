export default class MapTiles extends Phaser.Scene {
  constructor() {
    super({ key: 'MapTiles' });

      
  }

  preload() {
    this.load.image('background', 'src/assets/introductionScene/background.png');
    this.load.image('small', 'src/assets/introductionScene/small_article.png');
    this.load.image('medium', 'src/assets/introductionScene/medium_article.png');
    this.load.image('large', 'src/assets/introductionScene/large_article.png');
    this.load.image('tile', 'src/assets/introductionScene/tile.png');
    this.load.tilemapTiledJSON('map', 'src/assets/introductionScene/grid.json');
  }

  create() {
    this.add.image(400, 300, 'background');
    const map = this.make.tilemap({ key: 'map', tileWidth: 100, tileHeight: 100 });
    const tileset = map.addTilesetImage('tile');
    const gridLayer = map.createLayer('GridLayer', tileset, 0, 0);
      // Variables to store home positions
      this.homePositions = {
        small: { x: 600, y: 150 },
        medium: { x: 600, y: 280 },
        large: { x: 600, y: 520 },
      };

    // Add articles
    const smallArticle = this.add.sprite(this.homePositions.small.x, this.homePositions.small.y, 'small').setOrigin(0).setInteractive({ draggable: true });
    const mediumArticle = this.add.sprite(this.homePositions.medium.x, this.homePositions.medium.y, 'medium').setOrigin(0).setInteractive({ draggable: true });
    const largeArticle = this.add.sprite(this.homePositions.large.x, this.homePositions.large.y, 'large').setOrigin(0).setInteractive({ draggable: true });

    const cardSizes = {
      small: { width: 100, height: 200, snapX: 100, snapY: 200 },
      medium: { width: 200, height: 200, snapX: 200, snapY: 200 },
      large: { width: 300, height: 300, snapX: 300, snapY: 300 },
    };

    // Enable drag events for articles
    this.input.setDraggable(smallArticle);
    this.input.setDraggable(mediumArticle);
    this.input.setDraggable(largeArticle);

// Set up drag events
this.input.on('dragstart', (pointer, gameObject) => {
  gameObject.setTint(0xff0000);
});

this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
  gameObject.x = dragX;
  gameObject.y = dragY;
});

this.input.on('dragend', (pointer, gameObject) => {
  const tileWidth = map.tileWidth;
  const tileHeight = map.tileHeight;

  // Calculate the nearest grid position
  const snappedX = Phaser.Math.Snap.To(gameObject.x, tileWidth, 0);
  const snappedY = Phaser.Math.Snap.To(gameObject.y, tileHeight, 0);

  // Calculate the offset to keep the entire object within the grid
  const offsetX = (gameObject.x - snappedX) % tileWidth;
  const offsetY = (gameObject.y - snappedY) % tileHeight;

  // Adjust the position to include the offset
  const finalX = snappedX + (offsetX > tileWidth / 2 ? tileWidth : 0);
  const finalY = snappedY + (offsetY > tileHeight / 2 ? tileHeight : 0);

  // Check if the final position is within the grid
  const isWithinGrid = finalX >= 0 && finalX + gameObject.width <= map.widthInPixels && finalY >= 0 && finalY + gameObject.height <= map.heightInPixels;

  if (isWithinGrid) {
    gameObject.setPosition(finalX, finalY);
  } else {
    // Return to home position using `this.homePositions`
    gameObject.setPosition(this.homePositions[gameObject.texture.key].x, this.homePositions[gameObject.texture.key].y);
  }

  gameObject.clearTint();
});
  }
}
