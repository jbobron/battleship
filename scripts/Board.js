import React from 'react';

class Board extends React.Component {

  constructor() {
    super();

    this.state = {value: ''};
  }
  handleClick(boardPiece){
    boardPiece = boardPiece[1]
    if(!this.props.isMyTurn){
      alert("not your turn")
      return
    }
    if(boardPiece.shotAttempt !== ""){
      alert("already shot here, try again")
      return
    }
    
    this.props.hitOrMiss(boardPiece)
    
  }
  render() {
    return (
      <div style={{float: "left", paddingRight: "30px"}}>
      <div>{this.props.player}</div>
      <table>
        <tbody>
        {this.props.board.map((boardRow) => {
          return (
            <tr>
              {Object.entries(boardRow).map((boardPiece,i)=>{
                var shipPieceId = boardPiece[1].shipPieceId
                var style = {border: "1px solid black"}
                if(shipPieceId !== 0) style.backgroundColor = "green"
                return(
                  <td 
                    onClick={()=>this.handleClick(boardPiece)} 
                    style={style}
                  >
                    <tr >
                      {boardPiece[1].shotAttempt === "hit" || boardPiece[1].shotAttempt === "miss" ? 
                      <div style={boardPiece[1].shotAttempt === "hit" ? {color:"red"}:{}}>&#x25CF;</div>
                      : <div style={{visibility: "hidden"}}>{i}</div>
                      }
                    </tr>
                  </td>
                )
              })}
            </tr>
          )

        })}
        </tbody>
      </table>
      </div>
      //style={{visibility: "hidden"}}
      
    );
  }
}

export default Board;
