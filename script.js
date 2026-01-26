console.log(`meow! 🐈‍⬛`);

const clickerButton = document.getElementById(`clickerButton`);
const cookieCountDisplay = document.getElementById(`cookieDisplay`);
const cpsDisplay = document.getElementById(`cpsDisplay`);
const powerDisplay = document.getElementById(`powerDisplay`);
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
  [`ball o' wool`]: `./img/upgrades/ball.png`,
  [`claw sharpener`]: `./img/upgrades/claw.png`,
  [`cat grass`]: `./img/upgrades/grass.png`,
  [`jingly bell toy`]: `./img/upgrades/toy.png`,
  [`cool collar`]: `./img/upgrades/collar.png`,
  [`kitty kibble`]: `./img/upgrades/kibble.png`,
  [`catnip`]: `./img/upgrades/catnip.png`,
  [`fur brush`]: `./img/upgrades/brush.png`,
  [`comfy bed`]: `./img/upgrades/bed.png`,
  [`golden bell`]: `./img/upgrades/bell.png`,
};

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
  function buildButton(e, list, type) {
    const listItem = document.createElement(`li`);

    listItem.innerHTML = `<div class="shop-item" aria-label="button" tabindex="0">
                <img class="item-img" src="${upgradeImgList[e.name] || [e.img]}" />
                <p class="item-name">${e.name}</p>
                <p class="item-cost">Cost:${e.cost}</p>
                <p class="item-increase">Increase:${e.increase}</p>
                <p class="item-count">Have:${upgradeList[e.name]}</p>
              </div>`; // i got supremely lazy here but i'll fix it one day!

    listItem.addEventListener(`click`, () => {
      if (cookieCount >= e.cost) {
        cookieUpdate(-e.cost); // spend cookies
        upgradeList[e.name]++; // get upgrade

        switch (
          type // changed this to a switch case to make it easier to add other types
        ) {
          case `bonus`:
            clickPower = clickPower + e.increase;
            break;
          default:
            autoClickPower = autoClickPower + e.increase;
            cpsDisplay.textContent = `${clickPower}`;
            break;
        }

        listItem.innerHTML = `<div class="shop-item" aria-label="button">
                <img class="item-img" src="${upgradeImgList[e.name] || [e.img]}" />
                <p class="item-name">${e.name}</p>
                <p class="item-cost">Cost:${e.cost}</p>
                <p class="item-increase">Increase:${e.increase}</p>
                <p class="item-count">Have:${upgradeList[e.name]}</p>
              </div>`; // doubly lazy!
      } else {
        console.log(`you need ${e.cost - cookieCount} cookies!`);
      }
    });
    list.appendChild(listItem);
  }
  async function fetchUpgrades(url, type) {
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.forEach((e) => {
      if (!upgradeList[e.name]) {
        upgradeList[e.name] = 0;
      }
      if (type === "bonus") {
        buildButton(e, shopList2, type);
      } else {
        buildButton(e, shopList, type);
      }
    });
  }

  clickerButton.addEventListener(`click`, () => {
    const cookieDrop = document.createElement(`div`);
    cookieUpdate(clickPower);
    cookieDrop.classList = `cookie`;
    cookieDrop.style.left = `${Math.random() * 99}%`;
    cookieDrop.addEventListener(`animationend`, () => {
      console.log(`test`);
      cookieDrop.remove();
    });
    clickerButton.append(cookieDrop);
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

  fetchUpgrades(`https://msnicelupe.neocities.org/data.json`);
  fetchUpgrades(`https://msnicelupe.neocities.org/bonus.json`, `bonus`);
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
  cpsDisplay.textContent = `${autoClickPower}`;
  powerDisplay.textContent = `${clickPower}`;
  saveStats();
}

gameInit();
setInterval(gameUpdate, 1000);
