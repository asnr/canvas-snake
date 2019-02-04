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


export const initialModel = {
  snake: [{ x: 5, y: 17 }, { x: 6, y: 17 }, { x: 7, y: 17 }],
};


export const updateModel = ({ snake }) => {
  const directionKey = nextDirection ? nextDirection : currentDirection;
  nextDirection = null;

  const direction = DIRECTION[directionKey];
  const head = snake[0];
  const nextHead = {
    x: (BOARD_TILE_WIDTH + head.x + direction.x) % BOARD_TILE_WIDTH,
    y: (BOARD_TILE_HEIGHT + head.y + direction.y) % BOARD_TILE_HEIGHT,
  };

  currentDirection = directionKey;
  return {
    snake: [nextHead, ...snake.slice(0, -1)],
  };
};
