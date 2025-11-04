document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".hint-btn").forEach(btn => {
        btn.addEventListener("click", () => {
        const id = btn.dataset.hint;
        document.querySelector(`.hint-text[data-hint="${id}"]`).classList.toggle("hidden");
        });
    });
});