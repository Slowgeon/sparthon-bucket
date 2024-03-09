/** 캔버스 */
const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;
const ctx = canvas.getContext("2d");

let gameStarted = false;
const BG_MOVING_SPEED = 5;
let bgX = 0;
let scoreText = document.getElementById("score");
let score = 0;

/** 게임 변수 */
let timer = 0; // 장애물 생성 시간
let obstacleArray = []; // 장애물 배열(*장애물이 여러개일 수 있기 때문에 배열로 관리함)
let gameOver = false; // 게임 종료 여부
let jump = false; // 점프 여부

/** 르탄이 */
const RTAN_WIDTH = 100; // 르탄이 가로 너비
const RTAN_HEIGHT = 100; // 르탄이 세로 높이
const RTAN_INITIAL_X_POSITION = 10; // 르탄이의 위치 X 좌표
const RTAN_INITIAL_Y_POSITION = 400; // 르탄이의 위치 Y 좌표

/** 장애물 */
const OBSTACLE_WIDTH = 30; // 장애물 너비
const OBSTACLE_HEIGHT = 30; // 장애물 높이
const OBSTACLE_FREQUENCY = 50; // 장애물 생성 빈도
const OBSTACLE_SPEED = 7; // 장애물 속도

/** 오디오 객체 */
const jumpSound = new Audio();
jumpSound.src = "./assets/sounds/jump.mp3";
const bgmSound = new Audio();
bgmSound.src = "./assets/sounds/bgm.mp3";
const scoreSound = new Audio();
scoreSound.src = "./assets/sounds/score.mp3";
const defeatSound = new Audio();
defeatSound.src = "./assets/sounds/defeat2.mp3";

/** 이미지 */
// (1) 배경
const bgImage = new Image();
bgImage.src = "./assets/images/rtan_background.png";
// (2) 게임 시작
const startImage = new Image();
startImage.src = "./assets/images/rtan_start.png";
// (3) 게임 오버
const gameoverImage = new Image();
gameoverImage.src = "./assets/images/rtan_gameover.png";
// (4) 게임 재시작
const restartImage = new Image();
restartImage.src = "./assets/images/rtan_restart.png";
// (5) 달리는 르탄이 A
const rtanAImage = new Image();
rtanAImage.src = "./assets/images/rtan_running_a.png";
// (6) 달리는 르탄이 B
const rtanBImage = new Image();
rtanBImage.src = "./assets/images/rtan_running_b.png";
// (7) 게임 오버 르탄이
const rtanCrashImage = new Image();
rtanCrashImage.src = "./assets/images/rtan_crash.png";
// (8) 장애물
const rtan_obstacle = new Image();
rtan_obstacle.src = "./assets/images/rtan_obstacle.png";

/**
 * 게임 시작 화면을 그리는 함수
 */
function drawStartScreen() {
  // 배경 이미지 그리기
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

  const imageWidth = 473;
  const imageHeight = 316;
  const imageX = canvas.width / 2 - imageWidth / 2;
  const imageY = canvas.height / 2 - imageHeight / 2;

  ctx.drawImage(startImage, imageX, imageY, imageWidth, imageHeight);
}

/**
 * 두 개의 이미지가 모두 로드되면 게임 시작 화면을 그린다.
 */
let bgImageLoaded = new Promise((resolve) => {
  bgImage.onload = resolve;
});

let startImageLoaded = new Promise((resolve) => {
  startImage.onload = resolve;
});

Promise.all([bgImageLoaded, startImageLoaded]).then(drawStartScreen);






