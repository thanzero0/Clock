function updateClock() {
    const now = new Date();

    // Time format
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

    // Date format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);

    // Day format
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('day').textContent = dayName;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initialize clock immediately
updateClock();
