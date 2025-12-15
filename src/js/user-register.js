const flagSection = document.getElementById('flag-section');
const victorySection = document.getElementById('victory-section');
const nameForm = document.getElementById('name-form');
const saveFeedback = document.getElementById('save-feedback');
const completionTimeEl = document.getElementById('completion-time');
const firstWordSection = document.getElementById('first word');
const secondWordSection = document.getElementById('second word');
const thirdWordSection = document.getElementById('third word');
const mainText = document.getElementById('mainText');

function formatDateTime(timestamp) {
const date = new Date(timestamp);
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear();
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
return `${day}/${month}/${year} ${hours}:${minutes}`;
}

document.addEventListener('DOMContentLoaded', () => {
const submitBtn = document.querySelector('[data-flag-submit]');
const feedback = document.querySelector('[data-flag-feedback]');

const flagCompleted = localStorage.getItem('level10_completed');
if (flagCompleted === 'true') {
    flagSection.classList.add('hidden');
    victorySection.classList.remove('hidden');
    mainText.classList.add('hidden');
    firstWordSection.classList.add('hidden');
    secondWordSection.classList.add('hidden');
    thirdWordSection.classList.add('hidden');
    
    const savedName = localStorage.getItem('player_name');
    const savedTime = localStorage.getItem('register_time');
    
    if (savedName && savedTime) {
    document.getElementById('player-name').value = savedName;
    completionTimeEl.textContent = formatDateTime(parseInt(savedTime));
    
    saveFeedback.textContent = `Completed by: ${savedName}`;
    saveFeedback.classList.add('text-green-400');
    
    document.getElementById('player-name').disabled = true;
    nameForm.querySelector('button[type="submit"]').disabled = true;
    nameForm.querySelector('button[type="submit"]').classList.add('opacity-50', 'cursor-not-allowed');
    } else {
    completionTimeEl.textContent = '--:--';
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
    if (mutation.target === feedback && feedback.classList.contains('text-green-500')) {
        localStorage.setItem('level10_completed', 'true');
        
        setTimeout(() => {
        flagSection.classList.add('hidden');
        victorySection.classList.remove('hidden');
        location.reload();
        }, 1500);
    }
    });
});

observer.observe(feedback, { attributes: true, attributeFilter: ['class'] });
});

nameForm.addEventListener('submit', (e) => {
e.preventDefault();

const playerName = document.getElementById('player-name').value.trim();

if (!playerName) {
    saveFeedback.textContent = 'Please enter your name';
    saveFeedback.classList.add('text-red-400');
    saveFeedback.classList.remove('text-green-400');
    return;
}

const registerTime = Date.now();
localStorage.setItem('player_name', playerName);
localStorage.setItem('register_time', registerTime.toString());

completionTimeEl.textContent = formatDateTime(registerTime);

saveFeedback.textContent = `✓ Completed by: ${playerName}`;
saveFeedback.classList.remove('text-red-400');
saveFeedback.classList.add('text-green-400');

document.getElementById('player-name').disabled = true;
nameForm.querySelector('button[type="submit"]').disabled = true;
nameForm.querySelector('button[type="submit"]').classList.add('opacity-50', 'cursor-not-allowed');
});