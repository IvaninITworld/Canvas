const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// CSS 에서도 정의해주고 js 파일에서도 정의해주는 이유는
// 이미지의 퀄리티를 높이기 위함
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

let isPainting = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    // ctx.fill();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
  console.log(isPainting);
}

function cancelPainting() {
  isPainting = false;
  console.log(isPainting);
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
