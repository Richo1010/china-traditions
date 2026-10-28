/* =========================================================
   Генератор пожеланий на китайском языке
   ========================================================= */

const WISHES = {
  newyear: {
    title: "Новый год",
    intro: "С Праздником весны!",
    list: [
      { cn: "新年快乐", py: "xīn nián kuài lè", ru: "Счастливого Нового года", text: "Пусть новый год принесёт радость, тепло и много светлых дней." },
      { cn: "万事如意", py: "wàn shì rú yì", ru: "Пусть десять тысяч дел идут по желанию", text: "Пусть всё задуманное исполняется легко и именно так, как хочется." },
      { cn: "恭喜发财", py: "gōng xǐ fā cái", ru: "Поздравляю и желаю разбогатеть", text: "Желаю достатка, удачи в делах и щедрых красных конвертов." },
      { cn: "年年有余", py: "nián nián yǒu yú", ru: "Пусть каждый год будет избыток", text: "Пусть в доме всегда будет больше, чем нужно, — как рыбы на новогоднем столе." },
      { cn: "岁岁平安", py: "suì suì píng ān", ru: "Мира и спокойствия из года в год", text: "Пусть каждый год проходит спокойно, а беды обходят ваш дом стороной." },
      { cn: "五福临门", py: "wǔ fú lín mén", ru: "Пять благ у ваших дверей", text: "Пусть к вам придут все пять благ: долголетие, богатство, здоровье, добродетель и спокойная старость." }
    ]
  },
  birthday: {
    title: "День рождения",
    intro: "С днём рождения!",
    list: [
      { cn: "生日快乐", py: "shēng rì kuài lè", ru: "Счастливого дня рождения", text: "Пусть этот день будет полон улыбок, подарков и добрых слов." },
      { cn: "福如东海，寿比南山", py: "fú rú dōng hǎi, shòu bǐ nán shān", ru: "Счастья — как Восточное море, долголетия — как Южные горы", text: "Желаю счастья, безбрежного, как море, и долгой жизни, крепкой, как горы." },
      { cn: "心想事成", py: "xīn xiǎng shì chéng", ru: "Пусть сбудется то, о чём мечтает сердце", text: "Пусть каждое желание, загаданное сегодня, обязательно исполнится." },
      { cn: "笑口常开", py: "xiào kǒu cháng kāi", ru: "Пусть улыбка не сходит с лица", text: "Желаю, чтобы поводов для смеха и радости было как можно больше." },
      { cn: "长命百岁", py: "cháng mìng bǎi suì", ru: "Прожить сто лет", text: "Желаю долгих и счастливых лет жизни в кругу близких людей." }
    ]
  },
  wedding: {
    title: "Свадьба",
    intro: "Со свадьбой!",
    list: [
      { cn: "百年好合", py: "bǎi nián hǎo hé", ru: "Сто лет счастливого союза", text: "Пусть ваш союз будет крепким и счастливым долгие-долгие годы." },
      { cn: "永结同心", py: "yǒng jié tóng xīn", ru: "Навеки соединить сердца", text: "Пусть ваши сердца всегда бьются в унисон." },
      { cn: "天作之合", py: "tiān zuò zhī hé", ru: "Союз, созданный небесами", text: "Вы созданы друг для друга — пусть так будет всегда." },
      { cn: "白头偕老", py: "bái tóu xié lǎo", ru: "Вместе до седых волос", text: "Желаю пройти вместе всю жизнь, держась за руки." },
      { cn: "早生贵子", py: "zǎo shēng guì zǐ", ru: "Скорее родить драгоценного ребёнка", text: "Пусть в вашем доме скоро зазвучит детский смех." }
    ]
  },
  study: {
    title: "Учёба",
    intro: "Успехов в учёбе!",
    list: [
      { cn: "学业有成", py: "xué yè yǒu chéng", ru: "Успехов в учёбе", text: "Пусть знания даются легко, а экзамены сдаются на отлично." },
      { cn: "金榜题名", py: "jīn bǎng tí míng", ru: "Пусть имя появится в золотом списке", text: "В старом Китае имена лучших на экзаменах писали на золотой доске. Желаю оказаться среди лучших!" },
      { cn: "前程似锦", py: "qián chéng sì jǐn", ru: "Будущее — как узорчатая парча", text: "Пусть впереди ждёт яркое и прекрасное будущее." },
      { cn: "鹏程万里", py: "péng chéng wàn lǐ", ru: "Полёт птицы Пэн на десять тысяч ли", text: "Желаю высоких целей и большого пути, как у сказочной птицы Пэн." }
    ]
  },
  work: {
    title: "Работа и дело",
    intro: "Успехов в делах!",
    list: [
      { cn: "事业有成", py: "shì yè yǒu chéng", ru: "Успеха в карьере", text: "Пусть работа приносит удовольствие, признание и достойный доход." },
      { cn: "生意兴隆", py: "shēng yì xīng lóng", ru: "Процветания бизнесу", text: "Пусть дело растёт, а клиенты возвращаются снова и снова." },
      { cn: "步步高升", py: "bù bù gāo shēng", ru: "Подниматься выше с каждым шагом", text: "Желаю уверенного роста и новых достижений." },
      { cn: "马到成功", py: "mǎ dào chéng gōng", ru: "Успех, едва прибудет конь", text: "Пусть любое начинание сразу заканчивается победой." },
      { cn: "一帆风顺", py: "yī fān fēng shùn", ru: "Попутного ветра парусу", text: "Пусть всё складывается гладко, без бурь и препятствий." }
    ]
  },
  health: {
    title: "Здоровье",
    intro: "Будьте здоровы!",
    list: [
      { cn: "身体健康", py: "shēn tǐ jiàn kāng", ru: "Крепкого здоровья", text: "Желаю бодрости, сил и отличного самочувствия." },
      { cn: "龙马精神", py: "lóng mǎ jīng shén", ru: "Духа дракона и коня", text: "Пусть энергии хватает на всё, как у дракона и скакуна." },
      { cn: "平安喜乐", py: "píng ān xǐ lè", ru: "Покоя и радости", text: "Желаю спокойствия, безопасности и радости каждый день." },
      { cn: "健康长寿", py: "jiàn kāng cháng shòu", ru: "Здоровья и долголетия", text: "Пусть здоровье будет крепким, а жизнь — долгой." }
    ]
  }
};

let lastIndex = -1;
let currentWish = null;

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("occasion");
  select.innerHTML = Object.entries(WISHES)
    .map(([key, w]) => `<option value="${key}">${w.title}</option>`).join("");

  document.getElementById("wishForm").addEventListener("submit", e => {
    e.preventDefault();
    generate();
  });
  document.getElementById("againBtn").addEventListener("click", generate);
  document.getElementById("copyBtn").addEventListener("click", copyWish);
  select.addEventListener("change", () => {
    lastIndex = -1;
    renderAll();
  });

  renderAll();
});

function generate() {
  const key = document.getElementById("occasion").value;
  const list = WISHES[key].list;
  let i;
  do {
    i = Math.floor(Math.random() * list.length);
  } while (list.length > 1 && i === lastIndex);
  lastIndex = i;
  showWish(key, list[i]);
}

function showWish(key, wish) {
  const name = document.getElementById("recipient").value.trim();
  const greeting = name ? `${name}, ${WISHES[key].intro.toLowerCase()}` : WISHES[key].intro;
  currentWish = { greeting, ...wish };

  const card = document.getElementById("wishCard");
  card.innerHTML = `
    <div class="w-cn">${wish.cn}</div>
    <div class="w-py">${wish.py}</div>
    <div class="w-ru">«${wish.ru}»</div>
    <div class="w-text">${greeting} ${wish.text}</div>`;

  const box = document.getElementById("wishResult");
  box.classList.remove("show");
  void box.offsetWidth;
  box.classList.add("show");
}

function copyWish() {
  if (!currentWish) return;
  const w = currentWish;
  const text = `${w.cn} (${w.py}) — «${w.ru}». ${w.greeting} ${w.text}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("Пожелание скопировано"))
      .catch(() => showToast("Не удалось скопировать"));
  } else {
    showToast("Копирование не поддерживается браузером");
  }
}

/* Таблица всех пожеланий выбранного повода */
function renderAll() {
  const key = document.getElementById("occasion").value;
  const box = document.getElementById("allWishes");
  box.innerHTML = WISHES[key].list.map((w, i) => `
    <button class="symbol wish-item" data-i="${i}" style="cursor:pointer;font:inherit;color:inherit">
      <div class="cn brush" style="font-size:2rem;font-family:var(--font-brush)">${w.cn}</div>
      <div class="pinyin">${w.py}</div>
      <p>${w.ru}</p>
    </button>`).join("");
  box.querySelectorAll(".wish-item").forEach(btn => {
    btn.addEventListener("click", () => {
      lastIndex = +btn.dataset.i;
      showWish(key, WISHES[key].list[lastIndex]);
      document.getElementById("wishResult").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}
