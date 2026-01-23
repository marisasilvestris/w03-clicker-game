console.log(`meow!`);

const clickerButton = document.getElementById(`clickerButton`);
const cookieCountDisplay = document.getElementById(`cookieCounter`);
const clrBtn = document.getElementById(`clrBtn`);
const sideViewBtn = document.getElementById(`sideViewBtn`);
const shopList = document.getElementById(`shopList`);

const cookiesUp = document.getElementById(`cookiesUp`);
const powerUp = document.getElementById(`powerUp`);
const autoUp = document.getElementById(`autoUp`);

let cookieCount;
let clickPower;
let autoClickPower;
let upgradeCount = {};
let upgradeList = {};

function loadStats() {
  cookieCount = JSON.parse(localStorage.getItem(`cookieCount`)) || 0;
  clickPower = JSON.parse(localStorage.getItem(`clickPower`)) || 1;
  autoClickPower = JSON.parse(localStorage.getItem(`autoClickPower`)) || 0;
  upgradeList = JSON.parse(localStorage.getItem(`upgradeList`)) || {};
}
function saveStats() {
  localStorage.setItem(`cookieCount`, cookieCount);
  localStorage.setItem(`clickPower`, clickPower);
  localStorage.setItem(`autoClickPower`, autoClickPower);
  const upgradeJSON = JSON.stringify(upgradeList);
  localStorage.setItem(`upgradeList`, upgradeJSON);

  console.log(
    `saved stats! cookies: ${cookieCount}, click power: ${clickPower}, autoclick power: ${autoClickPower}`,
    upgradeList,
  );
}
function cookieUpdate(c) {
  cookieCount = cookieCount + c;
  cookieCountDisplay.textContent = `${cookieCount}`;
}

// id
// name
// cost
// increase
async function gameInit() {
  async function fetchUpgrades(u) {
    const response = await fetch(u);
    const jsonData = await response.json();
    jsonData.forEach((e) => {
      if (!upgradeList[e.name]) {
        upgradeList[e.name] = 0;
      }
      const listItem = document.createElement(`li`);
      const listItemBtn = document.createElement(`button`);
      listItemBtn.classList = `shop-item`;
      listItemBtn.textContent = `${upgradeList[e.name]} ${e.name}. cost:${e.cost}. cps increase:${e.increase}`;
      listItemBtn.addEventListener(`click`, () => {
        if (cookieCount >= e.cost) {
          cookieUpdate(-e.cost);
          upgradeList[e.name]++;
          console.log(`${upgradeList[e.name]}`);
        } else {
          console.log(`you need ${e.cost} cookies!`);
        }
      });
      listItem.appendChild(listItemBtn);
      shopList.appendChild(listItem);
    });
  }
  fetchUpgrades(`https://cookie-upgrade-api.vercel.app/api/upgrades`);

  clickerButton.addEventListener(`click`, () => {
    cookieUpdate(clickPower);
  });

  sideViewBtn.addEventListener(`click`, () => {
    sideViewBtn.classList = ``;
  });
  clrBtn.addEventListener(`click`, () => {
    cookieCount = 0;
    clickPower = 1;
    autoClickPower = 0;
    upgradeList = 0;
    cookieUpdate(0);
    console.log(`poof! numbers reset`);
  });

  function cheatBtns() {
    cookiesUp.addEventListener(`click`, () => {
      cookieCount = cookieCount + 10000;
    });
    powerUp.addEventListener(`click`, () => {
      clickPower = clickPower + 100;
    });
    autoUp.addEventListener(`click`, () => {
      autoClickPower = autoClickPower + 10;
    });
    cookiesUp.textContent = `cookies+10000: ${cookieCount || 0}`;
    powerUp.textContent = `clickpwr+100: ${clickPower || 0}`;
    autoUp.textContent = `autopwr+10: ${autoClickPower || 0}`;
  }
  cheatBtns();
  loadStats();
}
function gameUpdate() {
  function cheatBtns() {
    cookiesUp.textContent = `cookies+10000: ${cookieCount}`;
    powerUp.textContent = `clickpwr+100: ${clickPower}`;
    autoUp.textContent = `autopwr+10: ${autoClickPower}`;
  }
  cheatBtns();
  cookieUpdate(autoClickPower);
  saveStats();
}

gameInit();
setInterval(gameUpdate, 1000);
setInterval(cookieUpdate.bind(null, 0), 100);
