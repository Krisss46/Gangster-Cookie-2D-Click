let cookieCount = parseInt(localStorage.getItem('cookieCount')) || 0;
let cookieValue = parseInt(localStorage.getItem('cookieValue')) || 1;
let upgradeLevels = [100, 500, 3000, 10000, 25000];
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 0;

const counterElement = document.getElementById('counter');
const cookieImgElement = document.getElementById('cookieImg');
const cookieBtnElement = document.getElementById('cookieBtn');
const resetBtnElement = document.getElementById('resetBtn');
const priceElement = document.getElementById('price');

let resetConfirmationTimeout;

function addCookie() {
  cookieCount += cookieValue;
  counterElement.textContent = cookieCount;
  localStorage.setItem('cookieCount', cookieCount);
}

function upgradeCookie() {
  if (currentLevel < upgradeLevels.length) {
	if (cookieCount >= upgradeLevels[currentLevel]) {
	  cookieCount -= upgradeLevels[currentLevel];
	  cookieValue *= 2;
	  currentLevel++;
	  counterElement.textContent = cookieCount;
	  priceElement.textContent = upgradeLevels[currentLevel];
	  localStorage.setItem('cookieCount', cookieCount);
	  localStorage.setItem('cookieValue', cookieValue);
	  localStorage.setItem('currentLevel', currentLevel);
	  updateUpgradeButton();
	}
  } else {
	cookieBtnElement.textContent = "Max level";
	cookieBtnElement.disabled = true;
  }
}

function confirmReset() {
  if (resetBtnElement.textContent === "Reset") {
	resetBtnElement.textContent = "Sure?";
	resetConfirmationTimeout = setTimeout(() => {
	  resetBtnElement.textContent = "Reset";
	}, 3000);
  } else {
	clearTimeout(resetConfirmationTimeout);
	resetGame();
  }
}

function resetGame() {
  localStorage.clear();
  cookieCount = 0;
  cookieValue = 1;
  currentLevel = 0;
  counterElement.textContent = cookieCount;
  priceElement.textContent = upgradeLevels[currentLevel];
  cookieBtnElement.textContent = `Upgrade cookie for ${upgradeLevels[currentLevel]}`;
resetBtnElement.textContent = "Reset";
  cookieBtnElement.disabled = false;
  localStorage.setItem('cookieCount', cookieCount);
  localStorage.setItem('cookieValue', cookieValue);
  localStorage.setItem('currentLevel', currentLevel);
}

function updateUpgradeButton() {
  if (currentLevel < upgradeLevels.length) {
	cookieBtnElement.textContent = `Upgrade cookie for ${upgradeLevels[currentLevel]}`;
  } else {
	cookieBtnElement.textContent = "Max level";
	cookieBtnElement.disabled = true;
  }
}

cookieImgElement.onclick = addCookie;
cookieBtnElement.onclick = upgradeCookie;

// Set initial values on page load
counterElement.textContent = cookieCount;
priceElement.textContent = upgradeLevels[currentLevel];
updateUpgradeButton();