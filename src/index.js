import 'normalize.css';
import { BOARD_TILE_WIDTH, BOARD_TILE_HEIGHT } from './constants';
import { keyPressed, initialModel, updateModel } from './model';

const MILLISECONDS_BETWEEN_UPDATES = 200;

const TILE_WIDTH = 10;
const TILE_HEIGHT = 10;

const BOARD_PIXEL_WIDTH = TILE_WIDTH * BOARD_TILE_WIDTH;
const BOARD_PIXEL_HEIGHT = TILE_HEIGHT * BOARD_TILE_HEIGHT;


const startGame = () => {
  window.addEventListener('keydown', keyPressed, false);

  const canvas = document.getElementById('snake-canvas');
  canvas.width = BOARD_PIXEL_WIDTH;
  canvas.height = BOARD_PIXEL_HEIGHT;

  const context = canvas.getContext('2d');
  const timeNotSet = null;

  nextFrame(timeNotSet, context, initialModel());
};


const nextFrame = (lastUpdateTime, canvas_context, model) => {
  const advanceOneFrameCallback =
        advanceOneFrame.bind(null, lastUpdateTime, canvas_context, model);
  window.requestAnimationFrame(advanceOneFrameCallback);
};


const advanceOneFrame = (
  lastUpdateTime,
  canvas_context,
  model,
  thisFrameTime
) => {
  if (!lastUpdateTime) {
    lastUpdateTime = thisFrameTime;
    nextFrame(lastUpdateTime, canvas_context, model);
    return;
  }

  const timeSinceLastUpdate = thisFrameTime - lastUpdateTime;
  if (timeSinceLastUpdate < MILLISECONDS_BETWEEN_UPDATES) {
    nextFrame(lastUpdateTime, canvas_context, model);
    return;
  }

  const updatedModel = updateModel(model);
  drawUpdate(canvas_context, updatedModel);

  if (updatedModel.stillPlaying) {
    lastUpdateTime = thisFrameTime;
    nextFrame(lastUpdateTime, canvas_context, updatedModel);
  }
};


const drawUpdate = (context, { food, snake }) => {
  context.fillStyle = '#fdf6e3';
  context.fillRect(0, 0, BOARD_PIXEL_WIDTH, BOARD_PIXEL_HEIGHT);

  context.fillStyle = '#d33682';
  context.fillRect(
    TILE_WIDTH * food.x,
    TILE_HEIGHT * food.y,
    TILE_WIDTH,
    TILE_HEIGHT,
  );

  context.fillStyle = '#586e75';
  snake.forEach(({ x, y }) => {
    context.fillRect(TILE_WIDTH * x, TILE_HEIGHT * y, TILE_WIDTH, TILE_HEIGHT);
  });
};


window.onload = startGame;
