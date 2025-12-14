document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('main[data-level]');
  if (!mainElement) return;

  const currentLevel = parseInt(mainElement.dataset.level);
  if (currentLevel === 1) return;

  const isUnlocked = localStorage.getItem(`level${currentLevel}_unlocked`) === 'true';
  if (!isUnlocked) {
    document.body.innerHTML = '';

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-gray-900 flex items-center justify-center z-50 select-none';
    overlay.innerHTML = `
      <div class="text-center text-white px-6 py-10 max-w-md">
        <div class="text-6xl mb-6">🔒</div>
        <h2 class="text-3xl font-bold mb-4">Level ${currentLevel} is Locked</h2>
        <p class="text-gray-400 mb-8 text-lg">
          Complete the previous levels first to unlock this challenge.
        </p>
        <a href="/src/index.html"
           class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Go Back to Home
        </a>
      </div>
    `;

    document.body.appendChild(overlay);
  }
});