const prompt = require('prompt-sync')({sigint: true});
const rl = require('readline');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const validMoves = ['u', 'd', 'l', 'r'];

class Field {
  constructor(fieldLayout) {
    // 2-d array
    this._fieldLayout = fieldLayout,
    this._xPos = 0,
    this._yPos = 0
  }
  get_field() {
    return this._fieldLayout;
  }
  print() {
    const field = this.get_field();
    for(let i = 0; i < field.length; i++){
      let curRow = field[i].join(' ');
      process.stdout.write(curRow+'\n');
    }
  }
  validMove(userMove) {
    try {
      let pos = this.get_field()[this._xPos][this._yPos]
      return true;
    } catch(err) {
      process.stdout.write('Please enter a valid move.');
      return false;
    }
  }
  checkLoss() {
    try {
      if (this.get_field()[this._xPos][this._yPos] === hole) {
        return true;
      } else {
        return false
      }
    } catch (err) {
      console.log(`Found an error ${err}`);
      return true
    }
  }
  checkWin() {
    try {
      if (this.get_field()[this._xPos][this._yPos] === hat) {
        return true;
      } else {
        return false;
      }
    } catch(err){
      return false
    }
  }
  movePlayer(userMove) {
    if (userMove === 'u') {
      this._xPos -= 1;
    } else if (userMove === 'd') {
      this._xPos += 1;
    } else if (userMove === 'l') {
      this._yPos -= 1;
    } else if (userMove === 'r') {
      this._yPos += 1;
    }
  }
  updateBoard() {
    this.get_field()[this._xPos][this._yPos] = pathCharacter;
  }
  static generateField(height, width, numHoles=null) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        //
      }
    }
    if (numHoles != null) {
      //
    }
  }
  playGame(){
    //
  }
}

const gameBoard = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

/* While there is no loss or no win:
    Print board
    Ask player for move
    Check if that is valid (aka out of bounds)
    Check if loss/win
    Move the player (update path)

*/

while(true) {
  gameBoard.print();
  
  const userMove = prompt('Which way?');
  
  if (validMoves.includes(userMove) === false){
    process.stdout.write('Please enter a valid move\n');
    continue;
  }
  gameBoard.movePlayer(userMove);
  console.log(gameBoard._xPos);
  // check if move is win
  if (gameBoard.checkWin()) {
    process.stdout.write('Congrats, you found your hat!');
    process.exit();
  }
  // check if move is loss
  if (gameBoard.checkLoss()){
    process.stdout.write('Sorry, you fell down a hole!');
    process.exit();
  }
  gameBoard.updateBoard();
}
