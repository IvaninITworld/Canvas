const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// CSS 에서도 정의해주고 js 파일에서도 정의해주는 이유는
// 이미지의 퀄리티를 높이기 위함
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colours = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#95a5a6",
  "#e67e22",
  "#e74c3c",
  "#c0392b",
  "#f39c12",
  "#c0392b",
  "#bdc3c7",
  "#16a085",
  "#7f8c8d",
];

function onclick(event) {
  ctx.beginPath();
  ctx.moveTo(400, 400);
  const colour = colours[Math.floor(Math.random() * colours.length)];
  ctx.strokeStyle = colour;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

canvas.addEventListener("click", onclick);
