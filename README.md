# Tropico Times 

## Introduction

"Tropico Times" is a media manipulation game inspired by the iconic titles "Westport Independent" and "The Republia Times". The conception of this game also draws inspiration from "Papers, Please", another game known for its unique narrative and gameplay mechanics.

This project was crafted as a part of the **Jeux video 2D** course, instructed by [Isaac Pante](https://github.com/ipante) at the [University of Lausanne](https://www.unil.ch/) (UNIL).

**Author**: _Marcela Havrilova_ (<marcela.havrilova@unil.ch>)
**Date**: _Autumn semester, 2023_

## Gameplay

The core of "UNIL Game 2D" revolves around the influence and amplification of media in the context of a political campaign. Players must navigate through various scenes, choosing article titles and their prominence to sway public opinion and impact election results.

## Project Organization and Game Mechanics

- **Boot Scene**:
  - Initializes the `gameData` object.
  - Generates initial random voting results.

- **Scene 1 - Influence Scene**:
  - Players select article titles that will affect the campaign.

- **Scene 2 - Amplification Scene**:
  - Players choose the size of the article to amplify its impact.

- **Scene 3 - Graph Scene**:
  - Visual representation of the player's actions through a graph using Chart.js.

- **Finish Scene**:
  - Concludes the game and offers a restart option.

### Game Data

- A JavaScript object that holds all the data and state for the game.
- Data are retrievable and accessible across all scenes.

### Game Cycle

- Contains all functions called at different parts of the game such as start game, finish game, next day, etc.
- Initializes data and calculates initial candidate trend values for the graph for the first 14 days.

## Limitations



## Acknowledgments

Special thanks to [Isaac Pante](https://github.com/ipante) for his inspiring teachings which have greatly contributed to the development of this game.

## References

- Chart.js for graphing capabilities: [Chart.js](https://www.chartjs.org/)
- Phaser
