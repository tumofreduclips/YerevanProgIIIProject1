const LivingCreature = require("../LivingCreature");
const { grassEaterArr, grassArr } = require("../../data/memberArrays");
const { random } = require("../helperFunctions/helperFunctions");

class GrassEater extends LivingCreature {
  constructor(x, y, index) {
    super(x, y, index);

    this.energy = 0;
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
      [this.x + 1, this.y + 1]
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();

    return super.chooseCell(character);
  }

  move() {
    const newCell = random(this.chooseCell(0));
    this.multiply++;

    if (newCell) {
      matrix[newCell[1]][newCell[0]] = 2;
      matrix[this.y][this.x] = 0;

      this.multiply = 0;
      this.x = newCell[0];
      this.y = newCell[1];
      this.energy--;
    }
  }

  eat() {
    const grassCell = random(this.chooseCell(1));
    this.multiply++;

    if (grassCell) {
      matrix[grassCell[1]][grassCell[0]] = 2;
      matrix[this.y][this.x] = 0;

      for (const i in grassArr) {
        if (grassArr[i].x == grassCell[0] && grassArr[i].y == grassCell[1]) {
          grassArr.splice(i, 1);
          break;
        }
      }
      this.x = grassCell[0];
      this.y = grassCell[1];

      this.multiply = 0;
      this.energy++;
    } else {
      this.move();
    }

    if (this.energy >= 20) {
      this.mul();

      this.energy = 0;
    } else if (this.energy <= -10) {
      this.die();
    }
  }

  mul() {
    const newCell = random(this.chooseCell(0));

    if (newCell) {
      const newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);

      matrix[newCell[1]][newCell[0]] = 2;
      grassEaterArr.push(newGrassEater);
    }
  }

  die() {
    for (const i in grassEaterArr) {
      if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
        matrix[this.y][this.x] = 0;
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
}

module.exports = GrassEater;
