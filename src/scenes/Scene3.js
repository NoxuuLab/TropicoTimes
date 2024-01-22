// Scene3.js
import { goToNextDay, openPopup, adjustApprovalTrends } from './gameCycle.js';


export default class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
  }

  init(data) {
    // Data passed from Scene2
    this.gameData = data.gameData;
  }

  create() {


    const sumAmplifiedPost = this.gameData.gameState.selected.reduce((sum, item) => sum + (item.amplifiedPost || 0), 0);
    
    // Call adjustApprovalTrends and get the last and new ratings
    const {
        lastPresidenteRating, newPresidenteRating,
        lastRivieraRating, newRivieraRating
    } = adjustApprovalTrends(this.gameData, sumAmplifiedPost);

    // Log the last and new ratings
    console.log(`Last Presidente Rating: ${lastPresidenteRating}, New Presidente Rating: ${newPresidenteRating}`);
    console.log(`Last Riviera Rating: ${lastRivieraRating}, New Riviera Rating: ${newRivieraRating}`);


    const rivieraDataPoints = this.gameData.gameState.approvalTrends.riviera.map((value, index) => ({ x: index, y: value }));
    const presidenteDataPoints = this.gameData.gameState.approvalTrends.presidente.map((value, index) => ({ x: index, y: value }));
  

    console.log('rivera',rivieraDataPoints);
    console.log('el presidente',presidenteDataPoints);


    const gameContainer = document.getElementById('game-container');
    const rect = gameContainer.getBoundingClientRect(); // Get the position and size of the game container
    const canvas = document.createElement('canvas');


    const context = canvas.getContext('2d');
      if (!context) {
    console.error('Failed to get canvas context');
    }
    canvas.style.position = 'absolute';
    // Set the drawing dimensions for the canvas
    canvas.width = 500; // drawing units
    canvas.height = 300; // drawing units
    // Set the CSS styles for the canvas
    canvas.style.width = '500px !important';
    canvas.style.height = '300px !important';
    canvas.style.position = 'absolute';
    canvas.style.left = `${rect.left}px`; // Use the game container's position
    canvas.style.top = `${rect.top}px`; // Use the game container's position
    canvas.style.zIndex = '10'; // Ensure it's on top of other elements
  
    gameContainer.appendChild(canvas);

      const totalDuration = 1000;
      const delayBetweenPoints = totalDuration / rivieraDataPoints.length; // Use the length of your dataset
      const previousY = (ctx) => ctx.index === 0 
        ? ctx.chart.scales.y.getPixelForValue(100) 
        : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      
      const animation = {
        x: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: NaN, // the point is initially skipped
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
              return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
          }
        },
        y: {
          type: 'number',
          easing: 'linear',
          duration: delayBetweenPoints,
          from: previousY,
          delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
              return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
          }
        }
      };

      const config = {
        type: 'line',
        data: {
          datasets: [{
            label: 'Riviera',
            borderColor: 'red',
            borderWidth: 1,
            radius: 0,
            data: rivieraDataPoints,
          },
          {
            label: 'El Presidente',
            borderColor: 'blue',
            borderWidth: 1,
            radius: 0,
            data: presidenteDataPoints,
          }]
        },
        options: {
          animation: animation,
          responsive: false, // Add this line
          scales: {
            x: {
              type: 'linear', // Define as linear for numerical data
              min: 0,         // Start at 0 for days
              max: 25,        // Set to max number of days
              title: {
                display: true,
                text: 'Day'
              }
            },
            y: {
              min: 0,         // Approval rating starts at 0
              max: 100,       // Maximum approval rating is 100
              title: {
                display: true,
                text: 'Approval Rating (%)'
              }
            }
          },
          // Rest of your options like animation, interaction, plugins, etc.
        }
      };
      

    new Chart(context, config);
   
    console.log(config.data.datasets);
   

    const textStyle = { fontSize: '24px', fill: '#fff' };
    this.add.text(400, 300, `Sum of Amplified Posts: ${sumAmplifiedPost}`, textStyle).setOrigin(0.5);


    // Add a "Popup" button to the scene
    let popupButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 150, 'Popup', { fontSize: '32px', fill: '#f00' })
    .setOrigin(0.5)
    .setInteractive();

    popupButton.on('pointerdown', () => {
      const currentDayIndex = this.gameData.gameState.currentDay - 1;
      const messages = this.gameData.gameData.days[currentDayIndex].messages;

      let category;
      if (sumAmplifiedPost < 5) {
        category = "badjob";
      } else if (sumAmplifiedPost < 30) {
        category = "neutral";
      } else {
        category = "excellent";
      }

      const categoryMessages = messages.find(m => m.category === category).message;
      const randomMessageIndex = Math.floor(Math.random() * categoryMessages.length);
      const message = categoryMessages[randomMessageIndex].title;

      openPopup(this, message);
    });



    let nextDayButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Next Day', { fontSize: '32px', fill: '#0f0' })
      .setOrigin(0.5)
      .setInteractive();

      nextDayButton.on('pointerdown', () => {
        console.log('Current Day:', this.gameData.gameState.currentDay); // This line is fine.
        console.log('Max Day:', this.gameData.gameState.maxDay); // Use `this.gameData` instead of `gameData`.
        if (this.gameData.gameState.currentDay < this.gameData.gameState.maxDay) {
            // If it's not the last day, go to the next day (Scene1)
            goToNextDay(this.gameData);
            this.scene.start('Scene1', { gameData: this.gameData });
        } else {
            // If it's the last day, go to the FinishScene
            this.scene.start('FinishScene');
        }
      }); 

      this.events.on('shutdown', () => {
        if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    });
}
  }

