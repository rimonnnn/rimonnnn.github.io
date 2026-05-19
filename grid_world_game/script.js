const ROWS = 4;
const COLS = 4;

const START = [0, 0];
const GOAL = [3, 3];

const FIRES = [
  [1, 1],
  [2, 2],
];

const ACTIONS = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
};

const ACTION_ORDER = ["DOWN", "RIGHT", "UP", "LEFT"];

const ALPHA = 0.5;
const GAMMA = 0.9;
const EPSILON = 0.25;
const MAX_STEPS = 50;

let agentPosition = [...START];
let qTable = loadQTable();
let isAnimating = false;

const gridElement = document.getElementById("grid");
const statusElement = document.getElementById("status");

function stateKey(state) {
  return `${state[0]},${state[1]}`;
}

function sameState(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function isFire(state) {
  return FIRES.some((fire) => sameState(fire, state));
}

function move(state, action) {
  const [row, col] = state;
  const [dr, dc] = ACTIONS[action];

  const newRow = row + dr;
  const newCol = col + dc;

  if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) {
    return [...state];
  }

  return [newRow, newCol];
}

function getReward(state) {
  if (sameState(state, GOAL)) {
    return {
      reward: 20,
      done: true,
      result: "WIN",
    };
  }

  if (isFire(state)) {
    return {
      reward: -20,
      done: true,
      result: "LOSE",
    };
  }

  return {
    reward: -1,
    done: false,
    result: "RUNNING",
  };
}

function distanceToGoal(state) {
  return Math.abs(state[0] - GOAL[0]) + Math.abs(state[1] - GOAL[1]);
}

function drawGrid() {
  gridElement.innerHTML = "";

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const state = [row, col];

      const cell = document.createElement("div");
      cell.className = "cell";

      if (sameState(state, START)) {
        cell.classList.add("start");
      }

      if (isFire(state)) {
        cell.classList.add("fire");
      }

      if (sameState(state, GOAL)) {
        cell.classList.add("goal");
      }

      if (sameState(state, agentPosition)) {
        cell.classList.add("agent");
        cell.textContent = "🤖";
      } else if (isFire(state)) {
        cell.textContent = "🔥";
      } else if (sameState(state, GOAL)) {
        cell.textContent = "💎";
      }

      const coord = document.createElement("span");
      coord.className = "coord";
      coord.textContent = `(${row},${col})`;

      cell.appendChild(coord);
      gridElement.appendChild(cell);
    }
  }
}

function createEmptyQTable() {
  const table = {};

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = stateKey([row, col]);

      table[key] = {};

      for (const action in ACTIONS) {
        table[key][action] = 0;
      }
    }
  }

  return table;
}

function loadQTable() {
  const savedTable = localStorage.getItem("q_table_grid");

  if (!savedTable) {
    return createEmptyQTable();
  }

  try {
    const parsedTable = JSON.parse(savedTable);
    const emptyTable = createEmptyQTable();

    for (const state in emptyTable) {
      if (!parsedTable[state]) {
        parsedTable[state] = emptyTable[state];
      }

      for (const action in ACTIONS) {
        if (parsedTable[state][action] === undefined) {
          parsedTable[state][action] = 0;
        }
      }
    }

    return parsedTable;
  } catch {
    return createEmptyQTable();
  }
}

function saveQTable() {
  localStorage.setItem("q_table_grid", JSON.stringify(qTable));
}

function bestAction(state) {
  const key = stateKey(state);

  let best = ACTION_ORDER[0];
  let bestValue = qTable[key][best];

  for (const action of ACTION_ORDER) {
    const value = qTable[key][action];

    if (value > bestValue) {
      best = action;
      bestValue = value;
    }
  }

  return best;
}

function chooseLearningAction(state, explore = true) {
  if (explore && Math.random() < EPSILON) {
    const actions = Object.keys(ACTIONS);
    return actions[Math.floor(Math.random() * actions.length)];
  }

  return bestAction(state);
}

function updateQValue(state, action, reward, newState, done) {
  const key = stateKey(state);
  const newKey = stateKey(newState);

  const oldValue = qTable[key][action];

  let futureValue = 0;

  if (!done) {
    futureValue = Math.max(...Object.values(qTable[newKey]));
  }

  const newValue =
    oldValue + ALPHA * (reward + GAMMA * futureValue - oldValue);

  qTable[key][action] = newValue;
}

function chooseSimpleReflexAction(state) {
  const possibleActions = [];

  ACTION_ORDER.forEach((action, index) => {
    const newState = move(state, action);

    if (sameState(newState, state)) {
      return;
    }

    if (isFire(newState)) {
      return;
    }

    const distance = distanceToGoal(newState);

    possibleActions.push({
      distance,
      index,
      action,
    });
  });

  if (possibleActions.length > 0) {
    possibleActions.sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }

      return a.index - b.index;
    });

    return possibleActions[0].action;
  }

  const actions = Object.keys(ACTIONS);
  return actions[Math.floor(Math.random() * actions.length)];
}

function runSimpleReflexLogic() {
  let state = [...START];
  const path = [state];
  let totalReward = 0;

  for (let step = 0; step < MAX_STEPS; step++) {
    const action = chooseSimpleReflexAction(state);
    const newState = move(state, action);

    const { reward, done, result } = getReward(newState);

    totalReward += reward;
    state = newState;
    path.push(state);

    if (done) {
      return {
        path,
        totalReward,
        result,
      };
    }
  }

  return {
    path,
    totalReward,
    result: "TIME OUT",
  };
}

function trainLearningAgent(episodes = 500) {
  let wins = 0;
  let losses = 0;

  for (let episode = 0; episode < episodes; episode++) {
    let state = [...START];

    for (let step = 0; step < MAX_STEPS; step++) {
      const action = chooseLearningAction(state, true);
      const newState = move(state, action);

      const { reward, done, result } = getReward(newState);

      updateQValue(state, action, reward, newState, done);

      state = newState;

      if (done) {
        if (result === "WIN") {
          wins++;
        }

        if (result === "LOSE") {
          losses++;
        }

        break;
      }
    }
  }

  saveQTable();

  return {
    wins,
    losses,
  };
}

function runLearningAgent(learnWhileRunning = false) {
  let state = [...START];
  const path = [state];
  let totalReward = 0;

  for (let step = 0; step < MAX_STEPS; step++) {
    const action = chooseLearningAction(state, false);
    const newState = move(state, action);

    const { reward, done, result } = getReward(newState);

    totalReward += reward;

    if (learnWhileRunning) {
      updateQValue(state, action, reward, newState, done);
    }

    state = newState;
    path.push(state);

    if (done) {
      if (learnWhileRunning) {
        saveQTable();
      }

      return {
        path,
        totalReward,
        result,
      };
    }
  }

  if (learnWhileRunning) {
    saveQTable();
  }

  return {
    path,
    totalReward,
    result: "TIME OUT",
  };
}

function animatePath(path, totalReward, result, index = 0) {
  if (index >= path.length) {
    statusElement.textContent =
      `Result: ${result} | Total Reward: ${totalReward} | Path: ${JSON.stringify(path)}`;

    isAnimating = false;
    return;
  }

  agentPosition = path[index];
  drawGrid();

  setTimeout(() => {
    animatePath(path, totalReward, result, index + 1);
  }, 450);
}

function runSimpleReflexAgent() {
  if (isAnimating) {
    return;
  }

  isAnimating = true;
  agentPosition = [...START];

  statusElement.textContent = "Simple Reflex Agent is running...";

  const { path, totalReward, result } = runSimpleReflexLogic();

  animatePath(path, totalReward, result);
}

function trainAndRunLearningAgent() {
  if (isAnimating) {
    return;
  }

  isAnimating = true;
  agentPosition = [...START];

  statusElement.textContent = "Learning Agent is training...";

  setTimeout(() => {
    const { wins, losses } = trainLearningAgent(500);
    const { path, totalReward, result } = runLearningAgent(false);

    statusElement.textContent =
      `Training finished | Wins: ${wins} | Losses: ${losses}`;

    animatePath(path, totalReward, result);
  }, 200);
}

function runSavedLearningAgent() {
  if (isAnimating) {
    return;
  }

  isAnimating = true;
  agentPosition = [...START];

  statusElement.textContent = "Saved Learning Agent is running...";

  const { path, totalReward, result } = runLearningAgent(true);

  animatePath(path, totalReward, result);
}

function resetLearningMemory() {
  if (isAnimating) {
    return;
  }

  qTable = createEmptyQTable();
  localStorage.removeItem("q_table_grid");

  agentPosition = [...START];
  drawGrid();

  statusElement.textContent = "Learning memory reset";

  alert("Learning memory has been reset.");
}

drawGrid();