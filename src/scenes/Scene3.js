// Scene3.js
import textStyle from '/src/styles/textStyles.js';
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
    this.cameras.main.setBackgroundColor('#ffffff'); 

    const sumAmplifiedPost = this.gameData.gameState.selected.reduce((sum, item) => sum + (item.amplifiedPost || 0), 0);

    // Call adjustApprovalTrends and get the last and new ratings
    const {
        lastPresidenteRating, newPresidenteRating,
        lastRivieraRating, newRivieraRating
    } = adjustApprovalTrends(this.gameData, sumAmplifiedPost);

    const rivieraDataPoints = this.gameData.gameState.approvalTrends.riviera.map((value, index) => ({ x: index, y: value }));
    const presidenteDataPoints = this.gameData.gameState.approvalTrends.presidente.map((value, index) => ({ x: index, y: value }));

    // Preparing the game container
    const gameWidth = this.sys.game.config.width; // Get the width of the game from Phaser's configuration
    const canvasWidth = 500; // Set your desired canvas width

    // Create and setup canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
        console.error('Failed to get canvas context');
        return;
    }

    // Set the drawing dimensions for the canvas
    canvas.width = canvasWidth;
    canvas.height = 400; // Set your desired canvas height

    // Set the CSS styles for the canvas
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = '400px';
    canvas.style.position = 'absolute';
    canvas.style.left = `${(gameWidth - canvasWidth) / 2}px`; // Center horizontally
    canvas.style.top = '50px'; // Set an arbitrary vertical position, adjust as needed
    canvas.style.zIndex = '10';

    // Append canvas to your game container, assumed to be directly under the body or main game div
    const gameContainer = document.getElementById('game-container');
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
          from: NaN, 
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
            borderColor: 'rgb(255, 99, 132)', // bright red
            borderWidth: 2,
            borderDash: [5, 5], // dashed line
            pointStyle: 'circle',
            pointRadius: 5,
            pointBackgroundColor: 'rgb(255, 99, 132)', // matching point color
            data: rivieraDataPoints,
          }, {
            label: 'El Presidente',
            borderColor: 'rgb(54, 162, 235)', // bright blue
            borderWidth: 2,
            pointStyle: 'rect',
            pointRadius: 5,
            pointBackgroundColor: 'rgb(54, 162, 235)', // matching point color
            data: presidenteDataPoints,
          }]
        },
        options: {
          animation: animation,
          responsive: false,
          scales: {
            x: {
              type: 'linear',
              min: 0,
              max: 25,
              title: {
                display: true,
                text: 'Day',
                font: {
                  family: 'Roboto Mono', // Custom font
                  size: 16,
                  
                },
                color: '#333',
              }
            },
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: 'Approval Rating (%)',
                font: {
                  family: 'Roboto Mono',
                  size: 16,
                 
                },
                color: '#333',
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  family: 'Roboto Mono',
                  size: 14,
                },
                color: '#333'
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y}% on day ${context.parsed.x}`;
                }
              },
              backgroundColor: '#FFF',
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: '#CCC',
              borderWidth: 1,
            }
          }
        }
      };
      

    new Chart(context, config);
   
    console.log(config.data.datasets);
   

    const textStyle = { fontSize: '24px', fill: '#fff' };
    this.add.text(400, 300, `Sum of Amplified Posts: ${sumAmplifiedPost}`, textStyle).setOrigin(0.5);


    // Add a "Popup" button to the scene
    let popupButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 220, 'Popup', { fontSize: '32px', fill: '#f00' })
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



    let nextDayButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 180, 'Next Day', { fontSize: '32px', fill: '#f00' })
      .setOrigin(0.5)
      .setInteractive();

      nextDayButton.on('pointerdown', () => {
        console.log('Current Day:', this.gameData.gameState.currentDay); 
        console.log('Max Day:', this.gameData.gameState.maxDay); 
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