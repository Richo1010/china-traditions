/* =========================================================
   Интерактивный календарь праздников
   ========================================================= */

const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const MONTHS_CN = ["一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月"];
const SEASON_OF_MONTH = ["winter", "winter", "spring", "spring", "spring", "summer",
  "summer", "summer", "autumn", "autumn", "autumn", "winter"];
const SEASON_NAMES = { winter: "Зима", spring: "Весна", summer: "Лето", autumn: "Осень" };

const state = {
  year: new Date().getFullYear(),
  season: "all"
};

/* Годы, для которых есть данные */
const YEARS = [...new Set(HOLIDAYS.flatMap(h => h.dates.map(d => +d.slice(0, 4))))].sort();
if (!YEARS.includes(state.year)) state.year = YEARS[0];

document.addEventListener("DOMContentLoaded", () => {
  renderYears();
  renderCalendar();

  document.querySelectorAll("#seasonBar .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.season = btn.dataset.season;
      document.querySelectorAll("#seasonBar .chip").forEach(b => b.classList.toggle("active", b === btn));
      renderCalendar();
    });
  });

  /* Переход по ссылке вида holidays.html#zhongqiu */
  const id = location.hash.slice(1);
  if (id && HOLIDAYS.some(h => h.id === id)) showDetail(id, true);
});

function renderYears() {
  const bar = document.getElementById("yearBar");
  bar.innerHTML = YEARS.map(y =>
    `<button class="chip${y === state.year ? " active" : ""}" data-year="${y}">${y} год</button>`
  ).join("");
  bar.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.year = +btn.dataset.year;
      renderYears();
      renderCalendar();
    });
  });
}

function renderCalendar() {
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  MONTHS.forEach((name, m) => {
    const cell = document.createElement("div");
    cell.className = "month season-" + SEASON_OF_MONTH[m];

    /* праздники, попадающие в этот месяц выбранного года */
    const list = [];
    HOLIDAYS.forEach(h => {
      h.dates.forEach(s => {
        const d = new Date(s + "T00:00:00");
        if (d.getFullYear() === state.year && d.getMonth() === m) list.push({ h, d });
      });
    });
    list.sort((a, b) => a.d - b.d);

    let html = `<h4>${name} <small>${MONTHS_CN[m]}</small></h4>`;
    if (list.length === 0) {
      html += `<div class="empty">Нет традиционных праздников</div>`;
    }
    list.forEach(({ h, d }) => {
      const dim = state.season !== "all" && h.season !== state.season ? " dim" : "";
      html += `<button class="hol-btn${dim}" data-id="${h.id}">
        <span class="cn" style="color:inherit">${h.glyph}</span>
        <b>${h.name.split(" — ")[0]}</b>
        <span class="d">${d.getDate()}</span>
      </button>`;
    });
    cell.innerHTML = html;
    cal.appendChild(cell);
  });

  cal.querySelectorAll(".hol-btn").forEach(btn => {
    btn.addEventListener("click", () => showDetail(btn.dataset.id, true));
  });
}

function showDetail(id, scroll) {
  const h = HOLIDAYS.find(x => x.id === id);
  const box = document.getElementById("detail");
  const dateInYear = h.dates.find(s => +s.slice(0, 4) === state.year);
  const next = nextDate(h);

  let countdown = "";
  if (next) {
    const n = daysUntil(next);
    countdown = n === 0
      ? `<span class="mini-countdown">Праздник сегодня!</span>`
      : `<span class="mini-countdown">До праздника ${n} ${plural(n, "день", "дня", "дней")}</span>`;
  }

  box.innerHTML = `
    <div class="hd-head">
      <div class="seal">${h.glyph}</div>
      <div>
        <h2>${h.name}</h2>
        <div><span class="cn" style="font-size:1.3rem">${h.cn}</span> · <span class="pinyin">${h.pinyin}</span></div>
        <div style="margin-top:4px">${h.lunar}${dateInYear ? " · в " + state.year + " году: <b>" + formatDate(new Date(dateInYear + "T00:00:00")) + "</b>" : ""}</div>
        ${countdown}
      </div>
    </div>
    <p>${h.about}</p>
    <div class="hd-grid">
      <div>
        <h4>Обычаи</h4>
        <ul>${h.customs.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Праздничный стол</h4>
        <ul>${h.food.map(f => `<li>${f}</li>`).join("")}</ul>
      </div>
      <div>
        <h4>Даты</h4>
        <ul>${h.dates.map(s => `<li>${formatDate(new Date(s + "T00:00:00"))}</li>`).join("")}</ul>
        <p style="font-size:.9rem;margin-top:8px">Сезон: ${SEASON_NAMES[h.season]}</p>
      </div>
    </div>`;
  box.classList.remove("show");
  void box.offsetWidth; // перезапуск анимации
  box.classList.add("show");
  history.replaceState(null, "", "#" + id);
  if (scroll) box.scrollIntoView({ behavior: "smooth", block: "start" });
}
