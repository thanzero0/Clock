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

// UI Elements & Listeners
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const toggleDateInput = document.getElementById('toggle-date');
const toggle24hInput = document.getElementById('toggle-24h');
const precisionSelect = document.getElementById('precision-select');

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.toggle('hidden');
});

toggleDateInput.addEventListener('change', (e) => {
    showDate = e.target.checked;
    updateClock();
});

toggle24hInput.addEventListener('change', (e) => {
    use24h = e.target.checked;
    updateClock();
});

precisionSelect.addEventListener('change', (e) => {
    precision = e.target.value;
    updateClock();
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsBtn.contains(e.target) && !settingsPanel.contains(e.target)) {
        settingsPanel.classList.add('hidden');
    }
});

setInterval(updateClock, 1000);
updateClock();
