/* =========================================================
   Общие скрипты для всех страниц:
   меню, кнопка «Наверх», анимация появления,
   загрузка иллюстраций, обратный отсчёт до праздника
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initToTop();
  initReveal();
  initPhotos();
  initCountdown();
});

/* Мобильное меню */
function initMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "✕" : "☰";
  });
}

/* Кнопка «Наверх» появляется после прокрутки */
function initToTop() {
  const btn = document.querySelector(".to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 500);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Плавное появление блоков при прокрутке */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

/* Иллюстрации: если файл есть — показываем фото,
   если нет — остаётся узор с иероглифом */
function initPhotos() {
  document.querySelectorAll(".photo[data-img]").forEach(el => {
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url("${el.dataset.img}")`;
      el.classList.add("has-img");
    };
    img.src = el.dataset.img;
  });
}

/* Обратный отсчёт до ближайшего праздника */
function initCountdown() {
  const box = document.querySelector("[data-countdown]");
  if (!box || typeof nearestHoliday !== "function") return;

  const next = nearestHoliday();
  if (!next) {
    box.style.display = "none";
    return;
  }
  const { holiday, date } = next;

  box.querySelector(".cd-name").textContent = holiday.name;
  box.querySelector(".cd-cn").textContent = holiday.cn + " · " + holiday.pinyin;
  box.querySelector(".cd-date").textContent = formatDate(date) + " — " + holiday.short;
  const link = box.querySelector(".cd-link");
  if (link) link.href = "holidays.html#" + holiday.id;

  const units = {
    days: box.querySelector("[data-days]"),
    hours: box.querySelector("[data-hours]"),
    minutes: box.querySelector("[data-minutes]"),
    seconds: box.querySelector("[data-seconds]")
  };

  function tick() {
    let diff = Math.max(0, date - new Date());
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff - minutes * 60000) / 1000);

    units.days.textContent = days;
    units.hours.textContent = String(hours).padStart(2, "0");
    units.minutes.textContent = String(minutes).padStart(2, "0");
    units.seconds.textContent = String(seconds).padStart(2, "0");
    units.days.nextElementSibling.textContent = plural(days, "день", "дня", "дней");
  }
  tick();
  setInterval(tick, 1000);
}

/* Короткое всплывающее сообщение */
function showToast(text) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
