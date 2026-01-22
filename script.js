console.log(`meow!`);

const clickerButton = document.getElementById(`clickerButton`);

let cookieCount = 0;
let clickPower = 1;
let autoClick = 0;

function gameInit() {
  async function fetchUpgrades(u) {
    // await will wait for real data, rather than accept a Promise for it
    // await only works in an async function?
    const response = await fetch(u);
    // fetch will only request headers
    const jsonData = await response.json();
    return jsonData;
  }

  upgradeList = fetchUpgrades(
    `https://cookie-upgrade-api.vercel.app/api/upgrades`,
  );
  console.log(upgradeList);

  // function buyItem() {
  //   if (cookieCount < itemCost) {
  //     console.log(`not enough bucks, baby`);
  //   } else {
  //     autoClick = autoClick;
  //   }
  // }

  function loadStats() {
    let cookieSaved = Number(localStorage.getItem("cookieCount"));
    if (typeof cookieSaved === "number") {
      cookieCount = cookieSaved;
    } else {
      cookieCount = 0;
    }
    let powerSaved = Number(localStorage.getItem("clickPower"));
    if (typeof powerSaved === "number") {
      clickPower = powerSaved;
    } else {
      clickPower = 1;
    }
    let autoSaved = Number(localStorage.getItem("autoClick"));
    if (typeof autoSaved === "number") {
      autoClick = autoSaved;
    } else {
      autoClick = 0;
    }
    console.log(`loaded ${cookieSaved}, ${powerSaved}, ${autoSaved}`);
  }

  loadStats();
  const cookieCountDisplay = document.getElementById(`counter`);
  cookieCountDisplay.textContent = `${cookieCount}`;

  function cookieUpdate(e) {
    cookieCount = cookieCount + Number(e);
    cookieCountDisplay.textContent = `${cookieCount}`;
    console.log(cookieCount);
  }
  clickerButton.addEventListener(`click`, cookieUpdate.bind(null, 1));
}
function gameUpdate() {
  function saveStats() {
    localStorage.setItem("cookieCount", cookieCount);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("autoClick", autoClick);
  }
  saveStats();
  console.log(`saved ${cookieCount}, ${clickPower}, ${autoClick}`);
}
function upgrade() {}

gameInit();
setInterval(gameUpdate, 1000);
