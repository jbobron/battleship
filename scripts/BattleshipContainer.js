import React from 'react';
import Board from './Board';
import * as helpers from './helpers.js';

class BattleshipContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      player1: {
        shipsMap: {},
        board: [],
      },
      player2: {
        shipsMap: {},
        board: [],
      },
      player1turn: true,
      shotResult: "",
      shipHitName: 0,
      isShipSunk: false,
    }
    this.newGame = this.newGame.bind(this)
    this.hitOrMiss = this.hitOrMiss.bind(this)
    this.handleSunkLogic = this.handleSunkLogic.bind(this)
  }
  newGame(){
    this.state.player1.shipsMap = helpers.generateShipsMap()
    this.state.player1.board = helpers.generateBoard()
    this.state.player2.shipsMap = helpers.generateShipsMap()
    this.state.player2.board = helpers.generateBoard()
    this.setState({
      player1:this.state.player1, 
      player2:this.state.player2,
      player1turn: true,
      shotResult: "",
      shipHitName: 0,
      isShipSunk: false
    })
  }
  hitOrMiss(myBoardPiece){
    var {x,y,shipPieceId} = myBoardPiece
    var currentPlayer = this.state.player1turn ? "player2": "player1" //look at other players board
    var myName = this.state.player1turn ? "player1": "player2" //look at other players board
    var theirBoardPiece = this.state[currentPlayer].board[y][x] 
    var theirBoardMap = this.state[currentPlayer].shipsMap
    if(theirBoardPiece.shipPieceId !== 0){
      this.setState({shotResult: "hit"})
      this.state[myName].board[y][x].shotAttempt = "hit"
      this.handleSunkLogic(theirBoardMap, theirBoardPiece)
    }else {
      this.state[myName].board[y][x].shotAttempt = "miss"
      this.setState({shotResult: "miss"})
    }
    if(currentPlayer === "player1"){
      this.state.player1.board = this.state[currentPlayer].board
      this.setState({player1: this.state.player1})
    } else {
      this.state.player2.board = this.state[currentPlayer].board
      this.setState({player2: this.state.player2})
    }
    this.setState({player1turn: !this.state.player1turn})
  }
  handleSunkLogic(theirBoardMap, theirBoardPiece){
    theirBoardMap[theirBoardPiece.shipPieceId].hits += 1
    if(theirBoardMap[theirBoardPiece.shipPieceId].hits === theirBoardMap[theirBoardPiece.shipPieceId].size){
      this.setState({isShipSunk: true})
    }else {
      this.setState({isShipSunk: false})
    }
    this.setState({shipHitName: theirBoardMap[theirBoardPiece.shipPieceId].name})
    if(this.isGameOver(theirBoardMap)){
      if(confirm("Game Over!")){
        this.newGame()
        
      }
    }
  }
  isGameOver(theirBoardMap){
    var totalHits = 0
    for(var pieceId in theirBoardMap){
      totalHits += theirBoardMap[pieceId].hits
    }
    return totalHits === 17 ? true: false
  }

  render() {
    var playerShotAtName = this.state.player1turn ? "Player 1" : "Player 2"
    if(this.state.shotResult === "hit"){
      var hitOrSunk = this.state.isShipSunk ? "Sunk" : "Hit"
      var hitResultText = `You ${hitOrSunk} ${playerShotAtName}'s ${this.state.shipHitName}`
    }
    return (
      <div>
        <div style={{float: "left", padding:"30px", width:"200px"}}>
          <div onClick={this.newGame}>New Game</div>
          <div>Turn: {this.state.player1turn ? "Player1": "Player 2"}</div>
          {this.state.shotResult === "miss" ?
            <div>{this.state.shotResult}</div>
            :
            <div>
              {hitResultText}
            </div>
            
          }
        </div>
        <Board
          player={"Player 1"}
          board={this.state.player1.board}
          isMyTurn={this.state.player1turn}
          hitOrMiss={this.hitOrMiss}
        />
        <Board
          player={"Player 2"}
          board={this.state.player2.board}
          isMyTurn={!this.state.player1turn}
          hitOrMiss={this.hitOrMiss}
        />
      </div>
    );
  }
}

export default BattleshipContainer;


/*

boardPiece: {

}
*/