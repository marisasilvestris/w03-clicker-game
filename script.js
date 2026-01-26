console.log(`meow! 🐈‍⬛`);

// look into:
const state = {
  cookies: 100,
  cps: 1,
  purchases: [],
};

const html = document.querySelector(`html`);
const clickerButton = document.getElementById(`clickerButton`);
const cookieCountDisplay = document.getElementById(`cookieDisplay`);
const cpsDisplay = document.getElementById(`cpsDisplay`);
const powerDisplay = document.getElementById(`powerDisplay`);
const clrBtn = document.getElementById(`clrBtn`);
const sideViewBtn = document.getElementById(`sideViewBtn`);
const sideView = document.getElementById(`sideView`);
const shopList = document.getElementById(`shopList`);
const shopList2 = document.getElementById(`shopList2`);

// const cookiesUpSmall = document.getElementById(`cookiesUpSmall`);
// const cookiesUp = document.getElementById(`cookiesUp`);
// const powerUp = document.getElementById(`powerUp`);
// const autoUp = document.getElementById(`autoUp`);

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
  // TODO: roll these bad boys into one
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
    const itemContents = document.createElement(`div`);
    const itemImg = document.createElement(`img`);
    const itemName = document.createElement(`p`);
    const itemCost = document.createElement(`p`);
    const itemIncrease = document.createElement(`p`);
    const itemOwned = document.createElement(`p`);
    const toastRack = document.getElementById(`toastRack`);

    function buttonContents() {
      itemImg.src = `${upgradeImgList[e.name] || [e.img]}`;
      itemName.innerText = `${e.name}`;
      itemCost.innerText = `Cost: ${e.cost}`;
      itemIncrease.innerText = `Increase: ${e.increase}`;
      itemOwned.innerText = `Owned: ${upgradeList[e.name]}`;
    }

    itemContents.tabIndex = 0;
    // itemContents.role = `button`;
    itemContents.classList.add(`shop-item`);
    itemImg.classList.add(`item-img`);
    itemName.classList.add(`item-name`);
    itemCost.classList.add(`item-cost`);
    itemIncrease.classList.add(`item-increase`);
    itemOwned.classList.add(`item-owned`);

    buttonContents();
    listItem.appendChild(itemContents);
    itemContents.appendChild(itemImg);
    itemContents.appendChild(itemName);
    itemContents.appendChild(itemCost);
    itemContents.appendChild(itemIncrease);
    itemContents.appendChild(itemOwned); // sorry

    listItem.addEventListener(`click`, () => {
      if (cookieCount >= e.cost) {
        cookieUpdate(-e.cost); // spend money
        upgradeList[e.name]++; // get honeys

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
        buttonContents();
      } else {
        const toast = document.createElement(`li`);
        toast.classList.add(`toast`);
        toastRack.appendChild(toast);
        toast.innerHTML = `you need ${e.cost - cookieCount} cookies!`;

        setTimeout(() => {
          toast.remove();
        }, 3000);
      }
    });
    list.appendChild(listItem);
  }
  async function fetchUpgrades(url, type) {
    const response = await fetch(url);
    const jsonData = await response.json(); // genuinely made such a bollocks of this entire block, need to make this array-based so i don't have to do the Object.entries nonsense later. the original upgrade import even comes with an id for each item!
    jsonData.forEach((e) => {
      if (!upgradeList[e.name]) {
        upgradeList[e.name] = 0; // okay it works in practice but i don't know if this really does what i think it does: if object key doesn't exist, i create it with a value of 0 so it exists when i try to fiddle with it later?? i don't know what possessed me to do it this way
      }
      if (type === "bonus") {
        buildButton(e, shopList2, type);
      } else {
        buildButton(e, shopList, type);
      }
    });
  }

  // async function fetchUpgrades(url, type) {
  //   const res = await fetch(url)
  //   data =
  // } // hey look i'll get around to rewriting it

  clickerButton.addEventListener(`click`, () => {
    const cookieDrop = document.createElement(`div`);

    cookieDrop.classList = `cookie`;
    cookieDrop.style.left = `${Math.random() * 100}%`;
    cookieDrop.addEventListener(`animationend`, () => {
      cookieDrop.remove();
    });

    html.append(cookieDrop);
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

  fetchUpgrades(`https://msnicelupe.neocities.org/data.json`); // apologies for replacing the original source, i just wanted to change the names over the weekend without bothering sam (':
  // (i was tempted to do some horrible switch statement to replace each of the names at import but i Didn't Want To)
  fetchUpgrades(`https://msnicelupe.neocities.org/bonus.json`, `bonus`);
  cheatBtns();
  loadStats();
}
function gameUpdate() {
  cookieUpdate(autoClickPower);
  saveStats();
  cookiesUp.textContent = `cookies+10000: ${cookieCount}`;
  powerUp.textContent = `clickpwr+100: ${clickPower}`;
  autoUp.textContent = `autopwr+10: ${autoClickPower}`;
  cpsDisplay.textContent = `${autoClickPower}`;
  powerDisplay.textContent = `${clickPower}`;
}

gameInit();
setInterval(gameUpdate, 1000);
