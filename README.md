# Tropico Times

## Introduction

**Tropico Times** is an interactive media manipulation game, inspired by the critically acclaimed titles *The Westport Independent* and *The Republia Times*. The game draws additional inspiration from *Papers, Please*, known for its unique narrative depth and engaging gameplay mechanics. Developed as part of the **Jeux Vidéo 2D** course at the [University of Lausanne (UNIL)](https://www.unil.ch/), this project showcases the intricate dynamics of media influence within a political campaign.

**Instructor**: [Isaac Pante](https://github.com/ipante)  
**Author**: Marcela Havrilova (<marcela.havrilova@unil.ch>)  
**Date**: Autumn Semester, 2023

## Gameplay

In **Tropico Times**, players navigate through the complex landscape of media influence, making critical decisions on article selection and amplification to sway public opinion during an election campaign. The game challenges players to strategically manage the news cycle, leveraging their choices to affect the outcome of the political race.

### Key Mechanics

- **Article Selection**: Players choose headlines that will appear in the newspaper, each with varying impacts on public opinion.
- **Article Amplification**: Players decide the prominence of each article, influencing its effectiveness in swaying the public.
- **Dynamic Graphs**: The game features real-time graphical feedback, showing how player decisions affect the approval ratings of political figures over time.
- **Multiple Endings**: Depending on the player’s decisions, the game can end in various ways, offering replayability and a deep dive into the consequences of media manipulation.

## Project Organization and Game Mechanics

### Scenes

- **Boot Scene**:
  - The game begins by initializing critical game data, including initial voting results and preparing the player for the challenges ahead.

- **Scene 1 - Influence Scene**:
  - This scene tasks players with selecting article titles. Each choice directly influences the political landscape and the direction of the campaign.

- **Scene 2 - Amplification Scene**:
  - After choosing headlines, players determine the size and prominence of these articles, amplifying their impact on the public.

- **Scene 3 - Graph Scene**:
  - A visual representation of the player's decisions is shown through a graph, leveraging Chart.js to track approval ratings over the course of the campaign.

- **Finish Scene**:
  - The game concludes, summarizing the player's impact and offering an option to restart the experience.

### Game Data

The game is driven by a comprehensive JavaScript object that maintains the state across all scenes. This data structure includes information on article choices, public opinion trends, and other key game metrics.

### Game Cycle

The game cycle is a collection of functions that manage the flow of the game. It initializes data, manages day-to-day transitions, and calculates trends in public opinion over the 14-day campaign period.

## Limitations

- **Scope**: As a project developed within the constraints of an academic course, some features and complexities that could enhance the gameplay experience may not be fully realized.
- **Replayability**: While the game offers multiple endings, the depth of choices and their consequences are somewhat limited by the data set.

## Acknowledgments

Special thanks to [Isaac Pante](https://github.com/ipante) for his guidance and inspiration throughout the development of this project. His insights into game design and narrative structures were invaluable in bringing **Tropico Times** to life.

## References

- **Chart.js**: Utilized for graphing approval ratings and visualizing player impact. Learn more at [Chart.js](https://www.chartjs.org/).
- **Phaser**: The game framework that powers the core mechanics of **Tropico Times**.



## Acknowledgments

Special thanks to [Isaac Pante](https://github.com/ipante) for his inspiring teachings which have greatly contributed to the development of this game.

## References

- Chart.js for graphing capabilities: [Chart.js](https://www.chartjs.org/)
- Phaser
