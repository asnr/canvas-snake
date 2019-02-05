import { BOARD_TILE_WIDTH, BOARD_TILE_HEIGHT } from './constants';

// String constants are defined by key value HTML spec
//   https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const DIRECTION_KEY = {
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
};

const DIRECTION = {
  [DIRECTION_KEY.LEFT]: { x: -1, y: 0 },
  [DIRECTION_KEY.DOWN]: { x: 0, y: 1 },
  [DIRECTION_KEY.RIGHT]: { x: 1, y: 0 },
  [DIRECTION_KEY.UP]: { x: 0, y: -1 },
};

let nextDirection = null;
let currentDirection = DIRECTION_KEY.UP;

const ALLOWED_DIRECTIONS = {
  [DIRECTION_KEY.LEFT]: [DIRECTION_KEY.UP, DIRECTION_KEY.DOWN],
  [DIRECTION_KEY.DOWN]: [DIRECTION_KEY.LEFT, DIRECTION_KEY.RIGHT],
  [DIRECTION_KEY.RIGHT]: [DIRECTION_KEY.UP, DIRECTION_KEY.DOWN],
  [DIRECTION_KEY.UP]: [DIRECTION_KEY.LEFT, DIRECTION_KEY.RIGHT],
};


export const keyPressed = ({ key }) => {
  if (!nextDirection && directionIsAllowed(key)) {
    nextDirection = key;
  }
  keyPressedEvent.preventDefault();
};


export const directionIsAllowed = key =>
  ALLOWED_DIRECTIONS[currentDirection].find(x => x === key) !== undefined;


export const initialModel = () => {
  const snake = [{ x: 5, y: 17 }, { x: 6, y: 17 }, { x: 7, y: 17 }];
  return {
    food: placeFoodRandomly(snake),
    snake,
  };
};


export const updateModel = ({ food, snake }) => {
  const directionKey = nextDirection ? nextDirection : currentDirection;
  nextDirection = null;
  currentDirection = directionKey;

  const direction = DIRECTION[directionKey];
  const head = snake[0];
  const nextHead = {
    x: (BOARD_TILE_WIDTH + head.x + direction.x) % BOARD_TILE_WIDTH,
    y: (BOARD_TILE_HEIGHT + head.y + direction.y) % BOARD_TILE_HEIGHT,
  };

  const foodEaten = nextHead.x == food.x && nextHead.y == food.y;
  const tail = foodEaten ? snake : snake.slice(0, -1);
  const newSnake = [nextHead, ...tail];

  return {
    food: foodEaten ? placeFoodRandomly(newSnake) : food,
    snake: newSnake,
  };
};


const placeFoodRandomly = snake => {
  let food = randomPointOnBoard(BOARD_TILE_WIDTH, BOARD_TILE_HEIGHT);
  while (snake.some(vertebra => pointsEqual(vertebra, food))) {
    food = randomPointOnBoard(BOARD_TILE_WIDTH, BOARD_TILE_HEIGHT);
  }
  return food;
};


const pointsEqual = (point, otherPoint) =>
  point.x === otherPoint.x && point.y === otherPoint.y;


const randomPointOnBoard = (boardWidth, boardHeight) => (
  {
    x: randomIntegerInRange(0, boardWidth),
    y: randomIntegerInRange(0, boardHeight),
  }
);


const randomIntegerInRange = (lowerBound, upperBoundExcl) => {
  const randomOffset = (upperBoundExcl - lowerBound) * Math.random();
  return Math.floor(lowerBound + randomOffset);
};
