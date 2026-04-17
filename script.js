const dateText = document.getElementById("dateText");
const countdownEl = document.getElementById("countdown");
const resultEl = document.getElementById("result");
const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");

// Set convenient default: next Saturday at 20:00 local time.
function getNextSaturdayAtEightPm() {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7 || 7;
  target.setDate(now.getDate() + daysUntilSaturday);
  target.setHours(20, 0, 0, 0);
  return target;
}

const targetDate = getNextSaturdayAtEightPm();
dateText.textContent = targetDate.toLocaleString("ru-RU", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit"
});

function updateCountdown() {
  const now = new Date();
  const diffMs = targetDate - now;

  if (diffMs <= 0) {
    countdownEl.textContent = "Уже пора встречаться! ✨";
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  countdownEl.textContent = `${days} дн ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

yesBtn.addEventListener("click", () => {
  resultEl.textContent = "Ура! Я очень жду нашу встречу 💞";
  burstHearts();
});

maybeBtn.addEventListener("mouseenter", () => {
  maybeBtn.style.transform = `translate(${Math.random() * 14 - 7}px, ${Math.random() * 8 - 4}px)`;
});

maybeBtn.addEventListener("click", () => {
  resultEl.textContent = "Я умею ждать, но надеюсь на твое «Да» 😊";
});

function burstHearts() {
  for (let i = 0; i < 14; i += 1) {
    const heart = document.createElement("span");
    heart.textContent = "💖";
    heart.style.position = "fixed";
    heart.style.left = `${50 + (Math.random() * 24 - 12)}%`;
    heart.style.top = `${68 + (Math.random() * 6 - 3)}%`;
    heart.style.fontSize = `${16 + Math.random() * 18}px`;
    heart.style.pointerEvents = "none";
    heart.style.transition = "transform 1.5s ease, opacity 1.5s ease";
    heart.style.opacity = "1";
    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translate(${Math.random() * 180 - 90}px, -${90 + Math.random() * 130}px) rotate(${Math.random() * 90 - 45}deg)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => {
      heart.remove();
    }, 1600);
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
