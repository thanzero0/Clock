// State
let showDate = true;
let use24h = true;
let precision = 'hms'; // 'h', 'hm', 'hms'

function updateClock() {
    const now = new Date();

    // Time Format Logic
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (!use24h) {
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    const h = String(hours).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    let timeString = h;
    if (precision === 'hm' || precision === 'hms') timeString += `:${m}`;
    if (precision === 'hms') timeString += `:${s}`;
    if (!use24h) timeString += ` ${ampm}`;

    document.getElementById('time').textContent = timeString;

    // Date Visibility Logic
    const dateElement = document.getElementById('date');
    if (showDate) {
        dateElement.style.display = 'block';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    } else {
        dateElement.style.display = 'none';
    }
}

// UI Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const dateBtn = document.getElementById('toggle-date-btn');
const formatBtn = document.getElementById('toggle-24h-btn');
const precisionBtns = document.querySelectorAll('#precision-group .ui-button');

// Toggle Settings Panel
settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPanel.classList.toggle('hidden');
});

// Toggle Date
dateBtn.addEventListener('click', () => {
    showDate = !showDate;
    dateBtn.classList.toggle('active', showDate);
    updateClock();
});

// Toggle 24H/12H
formatBtn.addEventListener('click', () => {
    use24h = !use24h;
    formatBtn.classList.toggle('active', use24h);
    formatBtn.textContent = use24h ? '24H' : '12H';
    updateClock();
});

// Precision Controls
precisionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        precision = btn.dataset.value;
        precisionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateClock();
    });
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPanel.classList.add('hidden');
    }
});

setInterval(updateClock, 1000);
updateClock();
