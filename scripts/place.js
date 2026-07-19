
document.getElementById('year').textContent = new Date().getFullYear();

const lastMod = document.lastModified;
document.getElementById('last-modified').textContent =
    'Last modified: ' + lastMod;


function calculateWindChill(tempC, windKmh) {
    const vPow = Math.pow(windKmh, 0.16);
    return 13.12 + 0.6215 * tempC - 11.37 * vPow + 0.3965 * tempC * vPow;
}

const tempElement = document.getElementById('temp-display');
const windElement = document.getElementById('wind-display');
const chillElement = document.getElementById('windchill-display');

const tempText = tempElement.textContent.trim();
const tempValue = parseFloat(tempText.split(' ')[0]);

const windText = windElement.textContent.trim();
const windValue = parseFloat(windText.split(' ')[0]);

let chillDisplay = 'N/A';
if (tempValue <= 10 && windValue > 4.8) {
    const chill = calculateWindChill(tempValue, windValue);
    chillDisplay = chill.toFixed(1) + ' °C';
}
chillElement.textContent = chillDisplay;