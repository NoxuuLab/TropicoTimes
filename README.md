# Tropico Times 


## Introduction

**Tropico Times** is an interactive media manipulation game, inspired by the critically acclaimed titles *The Westport Independent* and *The Republia Times*. The game draws additional inspiration from *Papers, Please*, known for its unique narrative depth and engaging gameplay mechanics. Developed as part of the **Jeux Vidéo 2D** course at the [University of Lausanne (UNIL)](https://www.unil.ch/), this project showcases the intricate dynamics of media influence within a political campaign.

**Instructor**: [Isaac Pante](https://github.com/ipante)  
**Author**: Marcela Havrilova (<marcela.havrilova@unil.ch>)  
**Date**: Spring Semester, 2024

## Gameplay

#### Tropico Times Journal

**Tropico Times Journal** is a strategic narrative-driven game where you, the player, must use your journalistic skills to help your uncle, Professeur Riviera, win an election against the corrupt and power-hungry El Presidente. The game spans 7 in-game days, during which your decisions will influence public opinion and ultimately determine the outcome of the election.

#### 1. Influencing Module (Scene 1)

**Objective:** Choose and manipulate article titles to sway public opinion in favor of Professeur Riviera.

##### Gameplay Overview:
- Each day begins with you receiving 7 article titles to work on. These articles cover political, cultural, and sports topics.
- For each article, you have three title options:
  - **Pro-Government (Pro-El Presidente)**
  - **Neutral**
  - **Pro-Opposition (Pro-Professeur Riviera)**
- Your task is to carefully select titles that will help shift public opinion toward your uncle. The choices you make will directly influence the approval ratings of both candidates.

##### Actions:
- **Select Titles:** Click on each article title to choose from the three provided options.
- **Finalize Choices:** Once all titles are selected, click the "Finish" button to proceed to the next module.

#### 2. Amplification Module (Scene 2)

**Objective:** Amplify the impact of your chosen articles by strategically placing them in the newspaper.

##### Gameplay Overview:
- After selecting the article titles, it's time to publish them. The effectiveness of each article depends on its placement and size in the newspaper.
- Articles can be resized and positioned within the newspaper layout. The larger the article, the greater its influence on public opinion.

##### Actions:
- **Drag and Drop:** Select and drag each article onto the newspaper layout.
- **Resize Articles:** Adjust the size of each article to amplify its impact.
- **Finalize Layout:** Once satisfied with the layout, finalize the newspaper to see the results.

#### 3. Election Module (Scene 3)

**Objective:** Review the impact of your decisions and monitor the election progress.

##### Gameplay Overview:
- This scene displays the current standings of the election through a graph that shows the approval ratings of both candidates based on your previous actions.
- A pop-up message from "El Presidente's Spy" will humorously comment on your progress, providing feedback on how well (or poorly) you are doing.

##### Actions:
- **Examine Graph:** Review the graph that shows the shift in approval ratings.
- **Receive Feedback:** Read the pop-up message delivered by "El Presidente's Spy."
- **Proceed to Next Day:** Click the "Next Day" button to continue to the next day of the campaign.

#### 4. Final Day and Conclusion (Scene 4)

**Objective:** Determine the final outcome of the election.

- **Gameplay Overview**:
- After 7 days of influencing, amplifying, and reviewing your progress, the final day will reveal the outcome of the election.
- If Professeur Riviera's approval rating surpasses El Presidente's, Riviera wins the election. Otherwise, the game ends with Riviera's defeat.

- **Actions**:
- **Final Review:** The final scene will display a conclusive message based on the election results.
- **Restart Game:** After reviewing the results, you can choose to restart the game.

- **Conclusion**

Your mission as a journalist in **Tropico Times Journal** is not just to report the news but to shape it in favor of your uncle, Professeur Riviera. Through strategic decisions, keen observation, and a bit of manipulation, you will either guide him to victory or watch as El Presidente tightens his grip on power. Remember, the stakes are high—not just for Riviera, but for you and your family as well.

## Key Mechanics

- **Article Selection**: Players choose headlines that will appear in the newspaper, each with varying impacts on public opinion.
- **Article Amplification**: Players decide the prominence of each article, influencing its effectiveness in swaying the public.
- **Dynamic Graphs**: The game features real-time graphical feedback, showing how player decisions affect the approval ratings of political figures over time.
- **Multiple Endings**: Depending on the player’s decisions, the game can end in various ways, offering replayability and a deep dive into the consequences of media manipulation.

## Project Organization and description of the main files

### 1. BootScene.js
- **Purpose:** Initializes the game by loading essential assets (e.g., fonts, images, audio) and setting up the initial game state.
- **Key Functions:**
  - `preload()`: Loads all necessary game assets.
  - `create()`: Starts the game by transitioning to the `IntroScene` after initializing the game data.

### 2. Scene1.js (Influence Scene)
- **Purpose:** Allows the player to choose article titles to influence public opinion in favor of Professeur Riviera.
- **Key Functions:**
  - `create()`: Presents the player with article title options and saves their selections.
  - `updateGameData()`: Updates the game data based on the player's choices.

### 3. Scene2.js (Amplification Scene)
- **Purpose:** Enables the player to amplify the selected articles by strategically placing and resizing them in the newspaper.
- **Key Functions:**
  - `create()`: Allows drag-and-drop functionality to arrange articles within the newspaper layout.
  - `finalizeLayout()`: Saves the layout and calculates the amplification effect on public opinion.

### 4. Scene3.js (Election Module)
- **Purpose:** Displays the impact of the player's decisions using a graph that shows the approval ratings of the candidates.
- **Key Functions:**
  - `create()`: Generates the approval rating graph and provides feedback to the player via pop-up messages.
  - `nextDay()`: Transitions to the next day, continuing the game cycle.

### 5. PopupScene.js
- **Purpose:** Displays pop-up messages with feedback from "El Presidente's Spy," providing humorous and sarcastic commentary on the player's progress.
- **Key Functions:**
  - `create()`: Displays the message and includes a button to proceed to the next day or end the game.

### 6. FinishScene.js
- **Purpose:** Concludes the game by displaying the final outcome of the election based on the cumulative effects of the player's decisions.
- **Key Functions:**
  - `create()`: Displays the final results and offers the option to restart the game.

### 7. gameData.js
- **Purpose:** Contains the centralized data structure that stores all game-related data, including article choices, public opinion trends, and other metrics.
- **Structure:** Organized by days, with each day holding data about available articles, player choices, and resulting public opinion changes.

### 8. gameCycle.js
- **Purpose:** Manages the flow of the game across different days, including initializing game state, managing transitions, and updating public opinion trends.
- **Key Functions:**
  - `initializeGameState()`: Sets up the initial state of the game.
  - `goToNextDay()`: Handles the logic for moving from one day to the next, ensuring data is correctly updated.

## Limitations

- **Scope**: As a project developed within the constraints of an academic course, some features and complexities that could enhance the gameplay experience may not be fully realized.
- **Replayability**: While the game offers multiple endings, the depth of choices and their consequences are somewhat limited by the data set.

## Acknowledgments

Special thanks to [Isaac Pante](https://github.com/ipante) for his guidance and inspiration throughout the development of this project. His insights into game design and narrative structures were invaluable in bringing **Tropico Times** to life.

## References

- **Chart.js**: Utilized for graphing approval ratings and visualizing player impact. Learn more at [Chart.js](https://www.chartjs.org/).
- **Phaser**: The game framework that powers the core mechanics of **Tropico Times**.
- **Music**:  [Pixabay](https://pixabay.com/music/video-games-game-music-150676/)
- **Sound**: [Pixabay](https://pixabay.com/sound-effects/old-radio-button-click-97549/)
- **Icons**: [IconMaker](https://chatgpt.com/g/g-8hwRf54qt-icon-generator)


