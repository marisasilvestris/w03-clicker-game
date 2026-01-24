console.log(`meow! 🐈‍⬛`);

const clickerButton = document.getElementById(`clickerButton`);
const cookieCountDisplay = document.getElementById(`cookieCounter`);
const clrBtn = document.getElementById(`clrBtn`);
const sideViewBtn = document.getElementById(`sideViewBtn`);
const sideView = document.getElementById(`sideView`);
const shopList = document.getElementById(`shopList`);
const shopList2 = document.getElementById(`shopList2`);

const cookiesUpSmall = document.getElementById(`cookiesUpSmall`);
const cookiesUp = document.getElementById(`cookiesUp`);
const powerUp = document.getElementById(`powerUp`);
const autoUp = document.getElementById(`autoUp`);

const upgradeImgList = {
  [`Auto-Clicker`]: `./img/bongocat.jpg`,
  [`Enhanced Oven`]: `./img/bongocat.jpg`,
  [`Cookie Farm`]: `./img/bongocat.jpg`,
  [`Robot Baker`]: `./img/bongocat.jpg`,
  [`Cookie Factory`]: `./img/bongocat.jpg`,
  [`Magic Flour`]: `./img/bongocat.jpg`,
  [`Time Machine`]: `./img/bongocat.jpg`,
  [`Quantum Oven`]: `./img/bongocat.jpg`,
  [`Alien Technology`]: `./img/bongocat.jpg`,
  [`Interdimensional Baker`]: `./img/bongocat.jpg`,
};
const bonusUpgradeList = [
  {
    id: 1,
    name: "Finger Training",
    cost: 1000,
    increase: 1,
    img: `./img/upgrades/bonus1.png`,
  },
  {
    id: 2,
    name: "Reinforced Mouse Button",
    cost: 100000,
    increase: 10,
    img: `./img/upgrades/bonus2.png`,
  },
  {
    id: 3,
    name: "A Gun Made Of Clicking",
    cost: 10000000,
    increase: 100,
    img: `./img/upgrades/bonus3.png`,
  },
  {
    id: 4,
    name: "Frankly Unfriendly Amounts Of Clicks",
    cost: 1000000000,
    increase: 10000,
    img: `./img/upgrades/bonus4.png`,
  },
];

let cookieCount;
let clickPower;
let autoClickPower;
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
}

function cookieUpdate(c) {
  cookieCount = cookieCount + c;
  cookieCountDisplay.textContent = `${cookieCount}`;
}

async function gameInit() {
  function buildButton(e, list) {
    const listItem = document.createElement(`li`);
    listItem.innerHTML = `<div class="shop-item" aria-label="button">
                <img class="item-img" src="${upgradeImgList[e.name] || [e.img]}" />
                <p class="item-name">Name:${e.name}</p>
                <p class="item-cost">Cost:${e.cost}</p>
                <p class="item-increase">Increase:${e.increase}</p>
                <p class="item-count">Have:${upgradeList[e.name]}</p>
              </div>`; // i got supremely lazy here but i'll fix it one day!
    listItem.addEventListener(`click`, () => {
      if (cookieCount >= e.cost) {
        cookieUpdate(-e.cost); // spend cookies
        autoClickPower = autoClickPower + e.increase;
        console.log(e.increase);

        upgradeList[e.name]++;
        listItem.innerHTML = `<div class="shop-item" aria-label="button">
                <img class="item-img" src="./img/ui/yarn.png" />
                <p class="item-name">Name:${e.name}</p>
                <p class="item-cost">Cost:${e.cost}</p>
                <p class="item-increase">Increase:${e.increase}</p>
                <p class="item-count">Have:${upgradeList[e.name]}</p>
              </div>`; // doubly lazy!
      } else {
        console.log(`you need ${e.cost} cookies!`);
      }
    });
    list.appendChild(listItem);
  }
  async function fetchUpgrades(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.forEach((e) => {
      if (!upgradeList[e.name]) {
        upgradeList[e.name] = 0;
      }
      buildButton(e, shopList);
    });
  }
  async function fetchBonusUpgrades(array) {
    array.forEach((e) => {
      if (!upgradeList[e.name]) {
        upgradeList[e.name] = 0;
      }
      buildButton(e, shopList2);
    });
  }

  clickerButton.addEventListener(`click`, () => {
    cookieUpdate(clickPower);
  });
  sideViewBtn.addEventListener(`click`, () => {
    if (getComputedStyle(sideView).display === `none`) {
      sideView.style.display = `flex`;
    } else {
      sideView.style.display = `none`;
    }
  });
  clrBtn.addEventListener(`click`, () => {
    cookieCount = 0;
    clickPower = 1;
    autoClickPower = 0;
    Object.entries(upgradeList).forEach((e) => {
      upgradeList[e[0]] = 0;
    });
    cookieUpdate(0);
    console.log(`poof! numbers reset`);
  });

  function cheatBtns() {
    cookiesUpSmall.addEventListener(`click`, () => {
      cookieCount = cookieCount + 100;
    });
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

  fetchUpgrades(`https://cookie-upgrade-api.vercel.app/api/upgrades`);
  cheatBtns();
  loadStats();
  fetchBonusUpgrades(bonusUpgradeList);
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
setInterval(cookieUpdate.bind(null, 0), 300);
