const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let soundEnabled = true;
let planeImg = new Image();
planeImg.onload = function() {};
planeImg.src = 'file:///C:/Users/Rodri/Documents/ITA/4%C2%BA%20semestre/CES26/CES26/serie2/assets/image/aviao.png';


let missileImg = new Image();
missileImg.onload = function() {};
missileImg.src = 'file:///C:/Users/Rodri/Documents/ITA/4%C2%BA%20semestre/CES26/CES26/serie2/assets/image/missil.png';

let plane = {
  x: 0,
  y: 0,
  width: 50,
  height: 50
};

let missile = {
  x: 400,
  y: 300,
  width: 20,
  height: 20,
  speed: 5,
  fired: false
};

function toggleSound() {
  soundEnabled = !soundEnabled;
}

function playSound(id) {
    console.log("on playSound, id = ", id);
//   if (soundEnabled) {
//     const audio = document.getElementById(id);
//     audio.play();
//   }
}

function drawPlane() {
    if (planeImg.complete) {
      ctx.drawImage(planeImg, plane.x, plane.y, plane.width, plane.height);
    }
  }
  
  function drawMissile() {
    ctx.drawImage(missileImg, missile.x, missile.y, missile.width, missile.height);
  }

function updateMissile() {
  if (missile.fired) {
    const dx = plane.x - missile.x;
    const dy = plane.y - missile.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    missile.x += (dx / distance) * missile.speed;
    missile.y += (dy / distance) * missile.speed;

    if (
      missile.x < plane.x + plane.width &&
      missile.x + missile.width > plane.x &&
      missile.y < plane.y + plane.height &&
      missile.y + missile.height > plane.y
    ) {
      playSound("explosionSound");
      missile.fired = false;
      missile.x = 400;
      missile.y = 300;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlane();
  drawMissile();
  updateMissile();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("mousemove", function (event) {
  console.log("mousemove event = ", event);
  const rect = canvas.getBoundingClientRect();
  console.log("rect = ", rect)
  plane.x = event.clientX - rect.left/2;
  plane.y = event.clientY - rect.top/2;
});

canvas.addEventListener("contextmenu", function (event) {
  console.log("contextMenu event = ", event);
  event.preventDefault();
  missile.fired = true;
  playSound("missileSound");
});

gameLoop();
