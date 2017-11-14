/*
for each ship (largest to smallest)
  if current ship is not placed, randomly generate starting cordinates
    if coordinates are available (no)
      attempt to place on board (L,D,R,U)
        if ship does not go off board and ship does not overlap another ship
          place ship on board
    else(coordinates not available)
[
[5,5,5,5,5], //old way (now each element is an object "boardPiece")
[0,2,3,3,3],
[0,2,3,3,3],
[4,4,4,4,0]
]
*/
function createBoardPiece(){
  return {
    shipPieceId: 0,//0 nothing, id1-5 ship type
    shotAttempt: "",//"hit" or "miss" or ""
    x: 0,
    y:0,
  }
}

export function generateShipsMap() {
  return {
    id1: {
      id: "id1",
      name: "Carrier",
      size: 5,
      hits: 0,
    },
    id2:{
      id: "id2",
      name: "Battleship",
      size: 4,
      hits: 0,
    },
    id3:{
      id: "id3",
      name: "Cruiser",
      size: 3,
      hits: 0,
    },
    id4:{
      id: "id4",
      name: "Submarine",
      size: 3,
      hits: 0,
    },
    id5:{
      id: "id5",
      name: "Destroyer",
      size: 2,
      hits: 0,
    },
  }
}

export function generateBoard(){
  var boardSize = 10
  var board = generateEmptyBoard(boardSize)
  Object.entries(generateShipsMap()).forEach((arr)=>{
    let ship = arr[1]
    var isCurrentShipPlaced = false
    var attempts = 0
    while(!isCurrentShipPlaced){
      if(attempts > 100) return false
      attempts++
      var x = generateRandomCoordinate(boardSize)
      var y = generateRandomCoordinate(boardSize)
      if(coordinatesAreAvailable(x,y,board)){
        var directions = findAvailableDirectionsLDRU(x,y,ship.size,board)
        if(directions){
          var randomDirectionIndex = Math.floor(Math.random()*directions.length)
          board = placeOnBoard(x,y,ship.size,ship.id,directions[randomDirectionIndex],board)
          isCurrentShipPlaced = true
        }
      }
    }
  })
  return board
}

function placeOnBoard(x,y,shipLength,shipId,direction,board){
  if(direction === "left"){
    while(shipLength > 0){
      board[y][x-shipLength+1].shipPieceId = shipId
      shipLength--
    }
  }
  else if(direction === "down"){
    while(shipLength > 0){
      board[y+shipLength-1][x].shipPieceId = shipId
      shipLength--
    }
  }
  else if(direction === "right"){
    while(shipLength > 0){
      board[y][x+shipLength-1].shipPieceId = shipId
      shipLength--
    }
  }
  else if(direction === "up"){
    while(shipLength > 0){
      board[y-shipLength+1][x].shipPieceId = shipId
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
      var boardPiece = createBoardPiece()
      boardPiece.x = j
      boardPiece.y = i
      row.push(boardPiece)
    }
    board.push(row)
  }
  return board
}

function generateRandomCoordinate(size){
  return Math.floor(Math.random() * size);
}

function coordinatesAreAvailable(x,y,board){
  return board[y][x].shipPieceId === 0
}

function findAvailableDirectionsLDRU(x,y,shipLength,board){
  var directions = []
  if(isLeftAvail(x,y,shipLength,board)){
    directions.push("left")
  }
  if(isDownAvail(x,y,shipLength,board)){
    directions.push("down")
  }
  if(isRightAvail(x,y,shipLength,board)){
    directions.push("right")
  }
  if(isUpAvail(x,y,shipLength,board)){
    directions.push("up")
  }
  return directions
}

function isLeftAvail(x,y,shipLength,board){
  if(x-shipLength+1 >= 0){ //if left is still on board
    for(var i = 0; i < shipLength; i++){ //if row from x to x+shipLength is clear
      if(board[y][x-i].shipPieceId !== 0){
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
      if(board[y+i][x].shipPieceId !== 0){
        return false
      }
    }
    return true
  }
  return false
}
function isRightAvail(x,y,shipLength,board){
  if(x+shipLength <= board.length){
    for(var i = 0; i < shipLength; i++){
      if(board[y][x+i].shipPieceId !== 0){
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
      if(board[y-i][x].shipPieceId !== 0){
        return false
      }
    }
    return true
  }
  return false
}

function printBoard(board){ //for debugging
  var arr = []
  for(var y = 0; y < board.length; y++){
    var row = []
    for(var x = 0; x < board.length; x++){
      row.push(board[y][x].shipPieceId)
    }
    arr.push(row)
  }
  console.log(arr)
}