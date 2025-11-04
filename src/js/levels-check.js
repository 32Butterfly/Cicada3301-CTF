const levelHashes = {
  1: "f9e1fe7953d18dfe541ad14fb1f7a59154d39da230f826adbbccc5019967b38d",
  2: "1b18968cb73c009858eb36d5ac691796df816ed66247bf5ee5d853f7223e12c6",
};

const autoRedirectOnSuccess = true;
const levelPath = n => `/src/levels/level${n}.html`;

async function sha256Hex(message) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkFlag(level, flag) {
  const expected = levelHashes[level];
  const normalized = flag.trim();
  if (!normalized) return { ok: false, reason: "Please enter a flag." };

  const hash = await sha256Hex(normalized);

  if (hash.toLowerCase() === expected.toLowerCase()) {
    const nextLevel = parseInt(level) + 1;
    localStorage.setItem(`level${nextLevel}_unlocked`, "true");
    return { ok: true, reason: "Correct flag" };
  }

  return { ok: false, reason: "Incorrect flag" };
}

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll('[data-level-form]').forEach(form => {
    const level = form.dataset.levelForm;
    const input = form.querySelector('[data-flag-input]');
    const submit = form.querySelector('[data-flag-submit]');
    const feedback = form.querySelector('[data-flag-feedback]');

    submit.addEventListener('click', async () => {
      const result = await checkFlag(level, input.value);
      feedback.textContent = result.reason;
      feedback.classList.toggle('text-green-500', result.ok);
      feedback.classList.toggle('text-red-500', !result.ok);

      if (result.ok && autoRedirectOnSuccess) {
        const nextLevel = parseInt(level) + 1;
        setTimeout(() => {
          window.location.href = levelPath(nextLevel);
        }, 1900);
      }
    });
  });
});
