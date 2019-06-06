const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

/** Arrays */
const charNumArr = require("./data/charNumArr");

/** Global variables **/
matrix = [];
bornGrasses = 0;
bornGrassEaters = 0;
bornBears = 0;
bornHunters = 0;
bornHoles = 0;

const {
  grassArr,
  grassEaterArr,
  hunterArr,
  bearArr
} = require("./data/memberArrays");

/** helperFunctions */
const { random } = require("./modules/helperFunctions/helperFunctions");

/** Game members */
const Grass = require("./modules/Grass/Grass");
const GrassEater = require("./modules/GrassEater/GrassEater");
const Bear = require("./modules/Bear/Bear");
const Hunter = require("./modules/Hunter/Hunter");

const matrixCreator = (n, m) => {
  let limitBear = 0;
  let limitHunter = 0;
  let limitHole = 0;

  for (let y = 0; y < n; y++) {
    matrix[y] = [];
    for (let x = 0; x < m; x++) {
      const randNumForMatrix = random(charNumArr);

      if (randNumForMatrix == 1) {
        const grass = new Grass(x, y, 1);

        matrix[y][x] = randNumForMatrix;
        grassArr.push(grass);
      } else if (randNumForMatrix == 0) {
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 2) {
        const grassEater = new GrassEater(x, y, 1);

        matrix[y][x] = randNumForMatrix;
        grassEaterArr.push(grassEater);
      } else if (randNumForMatrix == 3 && limitBear < 30) {
        const bear = new Bear(x, y, 1);

        limitBear++;
        bearArr.push(bear);
        bornBears++;
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 4 && limitHunter < 3) {
        const hunter = new Hunter(x, y, 1);

        limitHunter++;
        hunterArr.push(hunter);
        bornHunters++;
        matrix[y][x] = randNumForMatrix;
      } else if (randNumForMatrix == 5 && limitHole < 3) {
        limitHole++;
        matrix[y][x] = randNumForMatrix;
        bornHoles++;
      } else {
        matrix[y][x] = 0;
      }
    }
  }
};
matrixCreator(40, 40);

const game = () => {
  const diedGrasses = bornGrasses - grassArr.length;
  const diedGrassEaters = bornGrassEaters - grassEaterArr.length;
  const diedHunters = bornHunters - hunterArr.length;
  const diedBears = bornBears - bearArr.length;
  const diedHoles = 0;

  const data = {
    matrix,
    bornMembers: {
      bornGrasses,
      bornGrassEaters,
      bornBears,
      bornHunters,
      bornHoles
    },
    diedMembers: {
      diedGrasses,
      diedGrassEaters,
      diedHunters,
      diedBears,
      diedHoles
    },
    countMembers: {
      countGrasses: grassArr.length,
      countGrassEaters: grassEaterArr.length,
      countBears: bearArr.length,
      countHunters: hunterArr.length,
      countHoles: bornHoles
    }
  };

  for (const i in hunterArr) {
    hunterArr[i].beat();
  }

  for (const i in grassArr) {
    if (bornGrasses - diedGrasses) {
      grassArr[i].mul();
      bornGrasses++;
    }
  }

  for (const i in grassEaterArr) {
    grassEaterArr[i].eat();
    bornGrassEaters++;
  }

  for (const i in bearArr) {
    bearArr[i].eat();
  }

  io.sockets.emit("send matrix", data);
};

setInterval(game, 400);

app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.redirect("index.html");
});

server.listen(8000, () => {
  console.log("Server listen to 8000 port");
});
