let cookieCount = parseInt(localStorage.getItem('cookieCount')) || 0;
let cookieValue = parseInt(localStorage.getItem('cookieValue')) || 1;
let upgradePrice = parseInt(localStorage.getItem('upgradePrice')) || 100;
let upgradeLevels = [500, 3000, 10000, 25000];
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 0;

const counterElement = document.getElementById('counter');
const cookieImgElement = document.getElementById('cookieImg');
const cookieBtnElement = document.getElementById('cookieBtn');
const resetBtnElement = document.getElementById('resetBtn');
const priceElement = document.getElementById('price');

function addCookie() {
  cookieCount += cookieValue;
  counterElement.textContent = cookieCount;
  localStorage.setItem('cookieCount', cookieCount);
}

function upgradeCookie() {
  if (currentLevel < upgradeLevels.length) {
    if (cookieCount >= upgradePrice) {
      cookieCount -= upgradePrice;
      cookieValue *= 2;
      upgradePrice = upgradeLevels[currentLevel];
      currentLevel++;
      counterElement.textContent = cookieCount;
      localStorage.setItem('cookieCount', cookieCount);
      localStorage.setItem('cookieValue', cookieValue);
      localStorage.setItem('upgradePrice', upgradePrice);
      localStorage.setItem('currentLevel', currentLevel);
    }
  } else {
    cookieBtnElement.textContent = "Max level";
    cookieBtnElement.disabled = true;
  }

  updateUpgradeButton();
}

function resetGame() {
  localStorage.clear();
  cookieCount = 0;
  cookieValue = 1;
  upgradePrice = 100;
  currentLevel = 0;
  counterElement.textContent = cookieCount;
  localStorage.setItem('cookieCount', cookieCount);
  localStorage.setItem('cookieValue', cookieValue);
  localStorage.setItem('upgradePrice', upgradePrice);
  localStorage.setItem('currentLevel', currentLevel);
  updateUpgradeButton();
}

function updateUpgradeButton() {
  if (currentLevel < upgradeLevels.length) {
    cookieBtnElement.textContent = `Upgrade cookie for ${upgradePrice}`;
  } else {
    cookieBtnElement.textContent = "Max level";
    cookieBtnElement.disabled = true;
  }
}

cookieImgElement.onclick = addCookie;

// Set initial values on page load
counterElement.textContent = cookieCount;
updateUpgradeButton();
