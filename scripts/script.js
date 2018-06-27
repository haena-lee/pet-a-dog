const houses = document.querySelectorAll('.dog-house');
const dogs = document.querySelectorAll('.shiba');


let score = 0;
let lastHouse;
let timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHouse(houses) {
  const idx = Math.floor(Math.random() * houses.length);
  const house = houses[idx];

  if (house === lastHouse) {
    return randomHouse(houses);
  }
  lastHouse = house;
  return house;
}

function peep() {
  const time = randomTime(300, 1000);
  const house = randomHouse(houses);

  house.classList.add('up');

  setTimeout(() => {
    house.classList.remove('up');
    scoreBoard.classList.remove('add');
    if (!timeUp) peep();
  }, time);
}


function start() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  scoreBoard.classList.remove('add');
  startScreen.classList.add('hide');

  // start peep
  peep();

  setTimeout(() => {
    timeUp = true;
    startScreen.classList.remove('hide');

    if (score > 0) {
      showScore.classList.add('show');
      const message = 'Your score: ' + score + (score >= 10 ? " GREAT!" : '');
      showScore.textContent = message;
    }

  }, 10000);
}

function bonk(e) {
  bonkSound.currentTime = 0;
  if (!timeUp) {
    bonkSound.play();
    scoreBoard.classList.add('add');
    score++;
    scoreBoard.textContent = score;
  }
}

dogs.forEach(dog => {
  dog.addEventListener('click', bonk);
});

// btnStart.addEventListener('click', start);