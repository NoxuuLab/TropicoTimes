# UNIL game 2D

## Introduction

this game was inpired by 2 iconic games Wesport Independent and The Republia Times
i loved the game  papers please. 

This project was created for the course on **Jeux video 2D** , run by [Isaac Pante](https://github.com/ipante) at the [University of Lausanne](https://www.unil.ch/) (UNIL).

**Author**: _Marcela Havrilova_ (<marcela.havrilova@unil.ch>)
**Date**: _Autumn semester, 2023_

## Gameplay


## Project organisation and game mechanics
boot scene:
    initialise gameData object 

    the function that initiale game also genrate the first random data as a results of votation before when we start work. 
    

scene 1
    influence scene- scene to choose titles that will have different effect sur le campain

scene 2:
    amplification scene - to choose the size of the article to amplify the title of article


scene 3: 
    graph scene, result of the player actions visualised as graph. i used chart js to display simple line chart within the phaser game. 

finish scene: 
    finish game and restart


game Data - 
    js object that holds all the data for the game, game Data and Game State
    this all can be retrive and accessible to all the scenes

gameCycle 
    hold all the function that are called in differents parts of the game, start game, finish game, next day etc.
    initialise data and calculate the initial populate the candidate trend values for graph for first 14 days. 



## Limitations

## Acknowledgments
Thanks to [Isaac Pante](https://github.com/ipante) for very inspiring teaching.

## References
chart js org
https://www.chartjs.org/
