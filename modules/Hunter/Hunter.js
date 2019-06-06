const LivingCreature = require("../LivingCreature");
const {
  hunterArr,
  grassEaterArr,
  bearArr
} = require("../../data/memberArrays");
const { random } = require("../helperFunctions/helperFunctions");

class Hunter extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);

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
          matrix[y][x] = 4;
          this.x = x;
          this.y = y;
          this.lastCellIndex = 0;
          break;
        case 1:
          matrix[this.y][this.x] = this.lastCellIndex;
          matrix[y][x] = 4;
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

  beat() {
    const newCellHerbivore = random(this.chooseCell(2));
    const newCellBear = random(this.chooseCell(3));

    if (newCellHerbivore) {
      matrix[newCellHerbivore[1]][newCellHerbivore[0]] = 4;
      matrix[this.y][this.x] = 0;

      for (const i in grassEaterArr) {
        if (
          grassEaterArr[i].x == newCellHerbivore[0] &&
          grassEaterArr[i].y == newCellHerbivore[1]
        ) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }

      this.x = newCellHerbivore[0];
      this.y = newCellHerbivore[1];
      this.multiply = 0;
    } else if (newCellBear) {
      matrix[newCellBear[1]][newCellBear[0]] = 4;
      matrix[this.y][this.x] = 0;

      for (const i in bearArr) {
        if (bearArr[i].x == newCellBear[0] && bearArr[i].y == newCellBear[1]) {
          bearArr.splice(i, 1);
          break;
        }
      }

      this.x = newCellBear[0];
      this.y = newCellBear[1];
      this.multiply = 0;
    } else {
      this.move();
    }
  }

  die() {
    for (let i in hunterArr) {
      if (hunterArr[i].x == this.x && hunterArr[i].y == this.y) {
        if (hunterArr.length === 1) {
          hunterArr.splice(i, 1);
          matrix[this.y][this.x] = 0;
          break;
        } else {
          hunterArr.splice(i, 1);
          matrix[this.y][this.x] = 0;
          break;
        }
      }
    }
  }
}

module.exports = Hunter;
