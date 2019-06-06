const LivingCreature = require("../LivingCreature");
const { bearArr, grassEaterArr } = require("../../data/memberArrays");
const { random } = require("../helperFunctions/helperFunctions");

class Bear extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);

    this.energy = 0;
    this.lastCellIndex = 0;
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
      [this.x - 2, this.y - 2],
      [this.x - 1, this.y - 2],
      [this.x, this.y - 2],
      [this.x + 1, this.y - 2],
      [this.x + 2, this.y - 2],
      [this.x + 2, this.y - 1],
      [this.x + 2, this.y],
      [this.x + 2, this.y + 1],
      [this.x + 2, this.y + 2],
      [this.x + 1, this.y + 2],
      [this.x, this.y + 2],
      [this.x - 1, this.y + 2],
      [this.x - 2, this.y + 2],
      [this.x - 1, this.y + 1],
      [this.x - 2, this.y],
      [this.x - 2, this.y - 1]
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();

    return super.chooseCell(character);
  }

  move() {
    const hole = this.chooseCell(5);
    const newCellEmpty = this.chooseCell(0);
    const newCellGrass = this.chooseCell(1);
    const myArr = [...hole, ...newCellEmpty, ...newCellGrass];
    const cell = random(myArr);

    if (cell) {
      const x = cell[0];
      const y = cell[1];

      switch (matrix[y][x]) {
        case 0:
          matrix[this.y][this.x] = this.lastCellIndex;
          matrix[y][x] = 3;
          this.x = x;
          this.y = y;
          this.lastCellIndex = 0;
          this.energy--;
          break;
        case 1:
          matrix[this.y][this.x] = this.lastCellIndex;
          matrix[y][x] = 3;
          this.x = x;
          this.y = y;
          this.lastCellIndex = 1;
          break;
        case 5:
          this.die();
          break;
        default:
          break;
      }
    }
  }

  eat() {
    const grassEaterCell = random(this.chooseCell(2));

    if (grassEaterCell) {
      matrix[grassEaterCell[1]][grassEaterCell[0]] = 3;
      matrix[this.y][this.x] = 0;

      for (const i in grassEaterArr) {
        if (
          grassEaterArr[i].x == grassEaterCell[0] &&
          grassEaterArr[i].y == grassEaterCell[1]
        ) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      this.x = grassEaterCell[0];
      this.y = grassEaterCell[1];
      this.energy++;
    } else {
      this.energy--;
      this.move();
    }

    if (this.energy <= -60) {
      this.die();
    }
  }

  die() {
    for (const i in bearArr) {
      if (bearArr[i].x == this.x && bearArr[i].y == this.y) {
        matrix[this.y][this.x] = 0;
        bearArr.splice(i, 1);
        break;
      }
    }
  }
}

module.exports = Bear;
