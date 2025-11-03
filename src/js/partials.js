fetch('/src/partials/navbar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar').innerHTML = html;

    const levelsMenu = document.getElementById('levelsMenu');
    const levelsBtn = document.getElementById('levelsBtn');
    const levelItems = document.querySelectorAll('.level-item');

    levelsBtn.addEventListener('click', () => {
        levelsMenu.classList.toggle('hidden');
    });

    window.addEventListener('click', (e) => {
        if (!levelsBtn.contains(e.target) && !levelsMenu.contains(e.target)) {
        levelsMenu.classList.add('hidden');
        }
    });

    levelItems.forEach(link => {
        const level = link.dataset.level;
        const unlocked = localStorage.getItem(`level${level}_unlocked`) === 'true';
        if (!unlocked && level !== "1") {
        const lock = document.createElement('span');
        lock.textContent = '🔒';
        lock.classList.add('ml-2');
        link.appendChild(lock);
        link.classList.add('bg-gray-700', 'opacity-60', 'cursor-not-allowed', 'pointer-events-none');
        }
    });
  });

fetch('/src/partials/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });