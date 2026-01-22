console.log(`meow!`);

const clickerButton = document.getElementById(`clickerButton`);
const cookieCountDisplay = document.getElementById(`cookieCounter`);
const shopList = document.getElementById(`shopList`);

const cookiesUp = document.getElementById(`cookiesUp`);
const powerUp = document.getElementById(`powerUp`);
const autoUp = document.getElementById(`autoUp`);

let cookieCount;
let clickPower;
let autoClickPower;

function loadStats() {
  cookieCount = JSON.parse(localStorage.getItem(`cookieCount`)) || 0;
  clickPower = JSON.parse(localStorage.getItem(`clickPower`)) || 1;
  autoClickPower = JSON.parse(localStorage.getItem(`autoClickPower`)) || 0;
  // console.log(`loaded ${cookieCount}, ${clickPower}, ${autoClickPower}`);
}
function saveStats() {
  localStorage.setItem(`cookieCount`, cookieCount);
  localStorage.setItem(`clickPower`, clickPower);
  localStorage.setItem(`autoClickPower`, autoClickPower);
  console.log(
    `saved stats! cookies:${cookieCount}, click power: ${clickPower}, autoclick power: ${autoClickPower}`,
  );
}
function cookieUpdate(e) {
  cookieCount = cookieCount + e;
  cookieCountDisplay.textContent = `${cookieCount}`;
}

async function gameInit() {
  async function fetchUpgrades(u) {
    const response = await fetch(u);
    const jsonData = await response.json();
    jsonData.forEach((element) => {
      const listItem = document.createElement(`li`);
      const listItemBtn = document.createElement(`button`);
      listItemBtn.classList = `shop-item`;
      listItemBtn.textContent = `${element.name}`;
      listItem.appendChild(listItemBtn);
      shopList.appendChild(listItem);
    });
  }
  let upgradeList = fetchUpgrades(
    `https://cookie-upgrade-api.vercel.app/api/upgrades`,
  );

  // function buyItem() {
  //   if (cookieCount < itemCost) {
  //     console.log(`not enough bucks, baby`);
  //   } else {
  //     autoClickPower = autoClickPower + itemIncrease;
  //   }
  // }

  clickerButton.addEventListener(`click`, () => {
    cookieUpdate(clickPower);
  });

  const clrBtn = document.getElementById(`clrBtn`);
  clrBtn.addEventListener(`click`, () => {
    cookieCount = 0;
    clickPower = 1;
    autoClickPower = 0;
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
  cookieUpdate(0);
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
function upgrade() {}

gameInit();
setInterval(gameUpdate, 1000);
