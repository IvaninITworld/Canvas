const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// CSS 에서도 정의해주고 js 파일에서도 정의해주는 이유는
// 이미지의 퀄리티를 높이기 위함
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210, 200, 15, 100);
ctx.fillRect(350, 200, 15, 100);
ctx.fillRect(260, 200, 60, 200);

ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(260, 80, 5, 0, 2 * Math.PI);
ctx.arc(220, 80, 5, 0, 2 * Math.PI);
ctx.fill();
