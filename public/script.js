let season = "Summer";

function setup() {
  const bearEl = document.getElementById("bear");
  const holeEl = document.getElementById("hole");
  const grassEl = document.getElementById("grass");
  const hunterEl = document.getElementById("hunter");
  const seasonEl = document.getElementById("season");
  const seasonBtn = document.getElementById("season-btn");
  const grassEaterEl = document.getElementById("grass-eater");
  const socket = io();
  const side = 13;

  frameRate(8);

  socket.on("send matrix", drawExecuter);

  function drawExecuter({ matrix, bornMembers, diedMembers, countMembers }) {
    const mxLength = matrix.length;
    const members = [bornMembers, diedMembers, countMembers];
    createCanvas(matrix[0].length * side, matrix.length * side);

    members.forEach(member => {
      for (const key in member) {
        if (member.hasOwnProperty(key)) {
          const element = document.getElementById(key);
          const value = member[key];
          element.innerText = value;
        }
      }
    });

    seasonBtn.onclick = () => {
      if (season === "Summer") {
        season = "Winter";
      } else {
        season = "Summer";
      }
      seasonEl.innerText = season;
    };

    const groundColor = season === "Winter" ? "skyblue" : "grey";
    const grassColor = season === "Winter" ? "white" : "green";
    const grassEaterColor = season === "Winter" ? "gold" : "yellow";
    const bearColor = season === "Winter" ? "saddlebrown" : "black";
    const hunterColor = season === "Winter" ? "chartreuse" : "red";
    const holeColor = season === "Winter" ? "black" : "white";

    grassEl.style.backgroundColor = grassColor;
    grassEaterEl.style.backgroundColor = grassEaterColor;
    bearEl.style.backgroundColor = bearColor;
    hunterEl.style.backgroundColor = hunterColor;
    holeEl.style.backgroundColor = holeColor;

    for (let y = 0; y < mxLength; y++) {
      for (let x = 0; x < mxLength; x++) {
        switch (matrix[y][x]) {
          case 0:
            fill(groundColor);
            rect(x * side, y * side, side, side);
            break;
          case 1:
            fill(grassColor);
            rect(x * side, y * side, side, side);
            break;
          case 2:
            fill(grassEaterColor);
            rect(x * side, y * side, side, side);
            break;
          case 3:
            fill(bearColor);
            rect(x * side, y * side, side, side);
            break;
          case 4:
            fill(hunterColor);
            rect(x * side, y * side, side, side);
            break;
          case 5:
            fill(holeColor);
            rect(x * side, y * side, side, side);
            break;
          default:
            break;
        }
      }
    }
  }
}
