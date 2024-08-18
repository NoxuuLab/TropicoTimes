import textStyle from '/src/styles/textStyles.js';
import { goToNextDay, showPopupWithNextButton, adjustApprovalTrends } from './gameCycle.js';

export default class Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene3' }); // Scene identifier
    }

    init(data) {
        // Receive game data from the previous scene
        this.gameData = data.gameData;
    }

    preload() {
        // Load necessary assets for this scene
        this.load.audio('buttonClick', 'src/assets/buttonClick.mp3'); 
        this.load.image('popupButton', 'src/assets/alea_iacta_est.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffff'); // Set background color
        this.buttonClickSound = this.sound.add('buttonClick'); // Button click sound

        // Calculate the total amplified impact of the articles
        const sumAmplifiedPost = this.gameData.gameState.selected.reduce((sum, item) => sum + (item.amplifiedPost || 0), 0);

        // Adjust the approval trends based on the amplified impact
        const { lastPresidenteRating, newPresidenteRating, lastRivieraRating, newRivieraRating } = adjustApprovalTrends(this.gameData, sumAmplifiedPost);

        // Prepare data points for the approval trend graph
        const rivieraDataPoints = this.gameData.gameState.approvalTrends.riviera.map((value, index) => ({ x: index, y: value }));
        const presidenteDataPoints = this.gameData.gameState.approvalTrends.presidente.map((value, index) => ({ x: index, y: value }));

        // Set up the canvas for drawing the approval trend graph
        const gameWidth = this.sys.game.config.width;
        const canvasWidth = 500;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
            console.error('Failed to get canvas context');
            return;
        }

        canvas.width = canvasWidth;
        canvas.height = 400;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = '400px';
        canvas.style.position = 'absolute';
        canvas.style.left = `${(gameWidth - canvasWidth) / 2}px`;
        canvas.style.top = '50px';
        canvas.style.zIndex = '1'; // Ensure canvas is beneath Phaser elements

        const gameContainer = document.getElementById('game-container');
        gameContainer.appendChild(canvas); // Append the canvas to the game container

        // Configure the chart animation
        const totalDuration = 1000;
        const delayBetweenPoints = totalDuration / rivieraDataPoints.length;
        const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

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

        // Chart configuration for displaying the approval trends
        const config = {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Riviera',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    data: rivieraDataPoints,
                }, {
                    label: 'El Presidente',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    pointStyle: 'rect',
                    pointRadius: 5,
                    pointBackgroundColor: 'rgb(54, 162, 235)',
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
                                family: 'Roboto Mono',
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
                            label: function (context) {
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

        // Render the chart with the configuration
        new Chart(context, config);
        this.chartCanvas = canvas; // Store the reference to the canvas

        // Display the sum of amplified posts
        const textStyle = { fontSize: '24px', fill: '#fff' };
        this.add.text(400, 300, `Sum of Amplified Posts: ${sumAmplifiedPost}`, textStyle).setOrigin(0.5);

        // Add a button to show the popup with feedback
        const popupButton = this.add.image(450, 500, 'popupButton'); // x and y are the coordinates where you want the button
        popupButton.setInteractive(); // Make the button interactive

        // Optional: Adjust the scale of the image if needed
        popupButton.setScale(0.3); // Adjust the scale as needed

        // Handle the pointerdown event to trigger the functionality when the button is clicked
        popupButton.on('pointerdown', () => {
            this.buttonClickSound.play();
            this.cleanupChart(); // Remove the chart before proceeding
        
            const currentDayIndex = this.gameData.gameState.currentDay - 1;
            const messages = this.gameData.gameData.days[currentDayIndex].messages;
        
            // Determine the feedback category based on the amplified impact
            let category;
            if (sumAmplifiedPost === 0) {
                category = "neutral";
            } else if (sumAmplifiedPost > 0 && sumAmplifiedPost < 5) {
                category = "badjob";
            } else if (sumAmplifiedPost < 0) {
                category = "excellent";
            }
        
            const categoryMessages = messages.find(m => m.category === category).message;
            const randomMessageIndex = Math.floor(Math.random() * categoryMessages.length);
            const message = categoryMessages[randomMessageIndex].title;
        
            // Transition to the PopupScene with the message
            this.scene.start('PopupScene', { message, gameData: this.gameData });
        });
        
        
        popupButton.on('pointerover', () => {
            popupButton.setTint(0x44ff44); // Change the color on hover
        });
        
        popupButton.on('pointerout', () => {
            popupButton.clearTint(); // Reset the color when not hovering
        });

        // Clean up the chart when the scene shuts down
        this.events.on('shutdown', () => {
            this.cleanupChart();
        });
    }

    cleanupChart() {
        // Remove the chart canvas from the DOM
        if (this.chartCanvas && this.chartCanvas.parentNode) {
            this.chartCanvas.parentNode.removeChild(this.chartCanvas);
        }
    }
}
