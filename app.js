// The top line
const saveButton = document.getElementById("save");
const textInput = document.getElementById("text");
const modeBtn = document.getElementById("mode-btn");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("line-color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// CSS 에서도 정의해주고 js 파일에서도 정의해주는 이유는
// 이미지의 퀄리티를 높이기 위함
canvas.width = 800;
canvas.height = 800;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    // ctx.fill();
    return;
  }
  ctx.beginPath();
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

function onLineWidthChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
  // ctx.color =
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  // URL 을 생성해줘 그리고 브라우저가 자신의 메모리에 저장하지
  // 그래서 다른데에서 열수 없음
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    // 기존에 가지고 있던 모든 변수들을 저장하고
    ctx.lineWidth = 1;
    ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
    // Save 와 restore 사이에 변화를 다시 복원시킨다.
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  // 캔버스에 그린 그림을 URL 로 변환한 다음에
  const a = document.createElement("a");
  // a 태그를 생성해 가짜링크를 만들고
  a.href = url;
  // 가짜링크의 href 를 그림 url 로 설정한뒤에
  a.download = "myDrawing.png";
  a.click();
  // 가짜링크를 클릭하게되면 "myDrawing" 으로 파일이 다운로드 되는 구조
}

// canvas 라이브러리가 가지고 있는 기능에서 넘어오는 정보들을 처리해주는 함수로
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
// canvas.onmousemove = onMove; 위 라인과 같은 의미
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

// html 쪽에 설정해준 id 에서 넘어오는 정보들을 처리해주는 함수로
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveButton.addEventListener("click", onSaveClick);
