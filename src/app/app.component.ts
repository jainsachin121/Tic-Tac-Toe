import { Component } from '@angular/core';
import { GameService} from '../app/game.service'
import {Block} from '../app/block';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameService]
})
export class AppComponent {
  title = 'Tic Tac Toe';
  player = "X";
  square =Array(9).fill(null);
  winner= null;

  constructor(public gs : GameService){
    gs.initBlocks();
    gs.initPlayers();
  }

  get status()
  {   
    let allFill = this.square.filter(value => value != null).length;
    if(allFill == 9)
    {
        return "Game Over";
    } 
    return this.winner ? `Winner: ${this.winner} ` : 'Player: ' + (this.player == "X" ? "X" : "O");
  }

  newGame()
  {
    this.player = "X";
    this.square =Array(9).fill(null);
    this.winner= null;
    this.gs.initBlocks();
    this.gs.initPlayers();
  }

  playerClick(i)
  {
    this.square[i] = this.player;
    if(!this.winner && this.gs.blocks[i].value == ""){
        this.gs.blocks[i].setValue(this.player);
        if(this.winningMove())
        {
            this.winner = this.player;
        }
        this.player = this.player == "X" ? "O" : "X";
    }
    
  }
 
  winningMove(): boolean {
      const lines =[
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      for(let line of lines)
      {
        if(this.square[line[0]]
        && this.square[line[0]] == this.square[line[1]]
        && this.square[line[1]] == this.square[line[2]]){
            return true;
        }
      }
      return false;
  }
}
