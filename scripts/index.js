import React from 'react';
import {render} from 'react-dom';

import WelcomeMessage from './welcome-message';

render(
  <WelcomeMessage
    message="Hello simple React webpack boilerplate"
  />,
  document.getElementById('app')
);


/*
for each ship (largest to smallest)
  if current ship is not placed, randomly generate starting cordinates
    if coordinates are available (no)
      attempt to place on board (L,D,R,U)
        if ship does not go off board and ship does not overlap another ship
          place ship on board
    else(coordinates not available)
[
[5,5,5,5,5],
[0,2,3,3,3],
[0,2,3,3,3],
[4,4,4,4,0]
]
*/

function generateBoard(){
  var ships = [5,4,3,3,2]
  var boardSize = 10
  var board = generateEmptyBoard(boardSize)
  for(var i = 0; i < ships.length; i++){
    var shipLength = ships[i]
    var isCurrentShipPlaced = false
    var attempts = 0
    while(!isCurrentShipPlaced){
      if(attempts > 1000) return false
      attempts++
      var x = generateRandomCoordinate(boardSize)
      var y = generateRandomCoordinate(boardSize)
      if(coordinatesAreAvailable(x,y,board)){
        var direction = findAvailableDirectionLDRU(x,y,shipLength,board)
        if(direction){
          board = placeOnBoard(x,y,shipLength,direction,board)
          isCurrentShipPlaced = true
        }
      }
    }
  }
    return board
}

function placeOnBoard(x,y,shipLength,direction,board){
  var shipNum = shipLength
  if(direction === "left"){
    while(shipLength > 0){
      board[y][x-shipLength+1] = shipNum
      shipLength--
    }
  }
  else if(direction === "down"){
    while(shipLength > 0){
      board[y+shipLength-1][x] = shipNum
      shipLength--
    }
  }
  else if(direction === "right"){
    while(shipLength > 0){
      board[y][x+shipLength-1] = shipNum
      shipLength--
    }
  }
  else if(direction === "up"){
    while(shipLength > 0){
      board[y-shipLength+1][x] = shipNum
      shipLength--
    }
  }
  return board
}

function generateEmptyBoard(size){
  var board = []
  for(var i = 0; i < size; i++){
    var row = []
    for(var j = 0; j < size; j++){
      row.push(0)
    }
    board.push(row)
  }
  return board
}

function generateRandomCoordinate(size){
  return Math.floor(Math.random() * size);
}

function coordinatesAreAvailable(x,y,board){
  return board[y][x] === 0
}

function findAvailableDirectionLDRU(x,y,shipLength,board){
  if(isLeftAvail(x,y,shipLength,board)){
    return "left"
  }
  if(isDownAvail(x,y,shipLength,board)){
    return "down"
  }
  if(isRightAvail(x,y,shipLength,board)){
    return "right"
  }
  if(isUpAvail(x,y,shipLength,board)){
    return "up"
  }
  return ""
}

function isLeftAvail(x,y,shipLength,board){
  if(x-shipLength+1 >= 0){ //if left is still on board
    for(var i = 0; i < shipLength; i++){ //if row from x to x+shipLength is clear
      if(board[y][x-i] !== 0){
        return false
      }
    }
    return true
  }
  return false
}

function isDownAvail(x,y,shipLength,board){
  if(y+shipLength <= board.length){
    for(var i = 0; i < shipLength; i++){
      if(board[y+i][x] !== 0){
        return false
      }
    }
    return true
  }
  return false
}
function isRightAvail(x,y,shipLength,board){
  debugger
  if(x+shipLength <= board.length){
    for(var i = 0; i < shipLength; i++){
      if(board[y][x+i] !== 0){
        return false
      }
    }
    return true
  }
  return false
}
function isUpAvail(x,y,shipLength,board){
  if(y-shipLength+1 >= 0){
    for(var i = 0; i < shipLength; i++){
      if(board[y-i][x] !== 0){
        return false
      }
    }
    return true
  }
  return false
}











