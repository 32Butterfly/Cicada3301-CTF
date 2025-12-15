const levelHashes = {
  1: "f9e1fe7953d18dfe541ad14fb1f7a59154d39da230f826adbbccc5019967b38d",
  2: "1b18968cb73c009858eb36d5ac691796df816ed66247bf5ee5d853f7223e12c6",
  3: "4dd6222ef47ba4a23d5ded9cf027a3a14e9e3b90c48c6ce6f3ee7885d01f80ea",
  4: "e36eaa2bdb372adce4bd3a8cd6b165daafbb4af19d85c805675ef245110b873b",
  5: "022daedba6a4a15d6c02bf200b5313f22af0f1fd8a87ebb8c7f83e4d3ab52b00",
  6: "1aa72f5ff9e4589d3799bcf08370fa1e69855dff7b12218244648b18eac9d705",
  7: "5e5a2ede2192f67ac4c193d320cf801c8b4ca2ce660e8f526aecb9b795b83b91",
  8: "2cbe9d40a652439c3ab136d281eea5603438a679d44d94ca7e09f78bd11ca3e1",
  9: "d04c1d7b17593a4f88715aec2ce2e83a8ab6d582529ddc23d8ba3e83b711ae6f",
  10: "b69b943b88c343f0f6189b7f01a406821e289ed5e06544b75ca3444cb8bc3b6c",
};

const autoRedirectOnSuccess = true;
const levelPath = n => `/Cicada3301-CTF/levels/level${n}.html`;

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
        if (level !== "10") {
          setTimeout(() => {
            window.location.href = levelPath(nextLevel);
          }, 1900);
        }
      }
    });
  });
});
