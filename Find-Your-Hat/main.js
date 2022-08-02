const prompt = require('prompt-sync')({sigint: true});
const rl = require('readline');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const validMoves = ['u', 'd', 'l', 'r'];

class Field {
  constructor(fieldLayout, height=3, width=3) {
    // 2-d array
    this._fieldLayout = fieldLayout,
    this._xPos = 0,
    this._yPos = 0,
    this._height = height,
    this._width = width
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
  checkOutOfBounds() {
    if (this._xPos < 0 || this._xPos > this._height || this._yPos < 0 || this._yPos > this._width) {
      return true;
    } else {
      return false;
    }
  }
  checkLoss() {
    try {
      //console.log(this.get_field()[this._xPos][this._yPos])
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
      console.log(`Found an error ${err}`);
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
    let field = [];
    for (let i = 0; i < height; i++) {
      let temp = [];
      for (let j = 0; j < width; j++) {
          temp.push(fieldCharacter)
      }
      field.push(temp);
    }
    field[0][0] = pathCharacter;
    const hatX = Math.floor(Math.random()*width);
    const hatY = Math.floor(Math.random()*height);
    while(hatX === 0 && hatY === 0){
      hatX = Math.floor(Math.random()*width);
      hatY = Math.floor(Math.random()*height);
    }
    field[hatX][hatY] = hat;
    for (let i = 0; i < numHoles; i++) {
      let holeX = Math.floor(Math.random()*width);
      let holeY = Math.floor(Math.random()*height);
      while(field[holeX][holeY] != fieldCharacter){
        holeX = Math.floor(Math.random()*width);
        holeY = Math.floor(Math.random()*height);
      }
      field[holeX][holeY] = hole;
    }
    return field;
  }
  playGame() {
    while(true) {
      gameBoard.print();
      
      const userMove = prompt('Which way?');
      
      if (validMoves.includes(userMove) === false){
        process.stdout.write('Please enter a valid move\n');
        continue;
      }
      
      gameBoard.movePlayer(userMove);
      
      if (gameBoard.checkOutOfBounds()) {
        process.stdout.write('Sorry, you fell off the map!\n');
        break;
      }
      
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
  }
}

let board = Field.generateField(5,5,3);

const gameBoard = new Field(board, 5, 5);
gameBoard.playGame();
