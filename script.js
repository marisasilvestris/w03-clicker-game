console.log(`meow!`);

const clickerButton = document.getElementById(`clickerButton`);

let cookieCount = 0;
let autoClick;

function gameInit() {
  const cookieCountDisplay = document.getElementById(`counter`);
  cookieCountDisplay.textContent = `${cookieCount}`;

  function cookieUpdate(e) {
    cookieCount = cookieCount + e;
    cookieCountDisplay.textContent = `${cookieCount}`;
    console.log(cookieCount);
  }
  clickerButton.addEventListener(
    `click`,
    cookieUpdate.bind(null, 3),
  ); /* i got really confused as to how a really simple thing (passing vars to an eventlistener-called function) seemed impossible, but this works? i read the MDN but i still don't really know why null is necessary */
}
function gameUpdate() {
  localStorage.setItem("cookieCount", cookieCount);
  const store = localStorage.getItem("cookieCount");
  console.log(store);

  console.log(`update`);
}
gameInit();
setInterval(gameUpdate, 1000);

function upgrade() {}
