import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, ArrowUp, Phone, Play, Plus, X, Send,
  MapPin, Mail, MessageCircle, CheckCircle,
  Volume2, VolumeX, ChevronLeft, ChevronRight, Images, Paperclip,
} from "lucide-react";
import "./App.css";

const HERO_IMG = "/hero.jpg?v=5";

const YM_ID = 110485166;
const reach = (goal) => {
  if (typeof window !== "undefined" && typeof window.ym === "function") window.ym(YM_ID, "reachGoal", goal);
};

const PROD_VIDEOS = Array.from({ length: 10 }, (_, i) => i + 1);

const REAL_PROJECTS = [
  { slug: "proj-1",  name: "ЖК «Headliner»",                     count: 9 },
  { slug: "proj-2",  name: "ЖК «Sky House»",                     count: 2 },
  { slug: "proj-3",  name: "ЖК «Сколковский»",                   count: 3 },
  { slug: "proj-4",  name: "ЖК «Дмитровский парк»",              count: 5 },
  { slug: "proj-5",  name: "ЖК «Западный порт»",                 count: 8 },
  { slug: "proj-6",  name: "ЖК «Ильменский 17»",                 count: 7 },
  { slug: "proj-7",  name: "ЖК «Крылья»",                        count: 7 },
  { slug: "proj-8",  name: "ЖК «Мякинино парк»",                 count: 6 },
  { slug: "proj-9",  name: "ЖК «Огни»",                          count: 9 },
  { slug: "proj-10", name: "ЖК «Саларьево парк»",                count: 6 },
  { slug: "proj-11", name: "ЖК «Дом на Беговой»",                count: 7 },
  { slug: "proj-12", name: "ЖК «Зиларт»",                        count: 12 },
  { slug: "proj-13", name: "ЖК «Лица»",                          count: 6 },
  { slug: "proj-14", name: "ЖК «Сколково парк»",                 count: 14 },
  { slug: "proj-15", name: "Клиника «Лазер Белль»",              count: 2 },
  { slug: "proj-16", name: "Коттедж · ДСК «Мичуринец»",          count: 10 },
  { slug: "proj-17", name: "Коттедж · «Усово Плюс»",             count: 16 },
  { slug: "proj-18", name: "Коттедж · Внуково",                  count: 11 },
  { slug: "proj-19", name: "Бутик одежды · Самара и Тольятти",   count: 3 },
  { slug: "proj-20", name: "Офис «Стройтрест» · Сочи",           count: 3 },
  { slug: "proj-21", name: "Психологический центр · Бауманская", count: 6 },
];

const ABOUT_LIST = [
  "Изготовим диваны, кресла, кровати, стулья, пуфы и банкетки любой сложности",
  "Подберём вариант реализации под ваш бюджет",
  "Чёткое соблюдение сроков и выплата пени в случае задержек",
];

const STEPS = [
  ["01", "Консультация", "По вашему фото, картинке или дизайн-проекту менеджер рассчитает стоимость изделия и поможет подобрать вариант реализации под ваш бюджет."],
  ["02", "Выезд на замеры, подбор тканей и наполнения", "Встреча, которая поможет получить максимально желаемый результат: мебель ювелирно встанет в пространство, будет комфортной и соответствовать вашим тактильным и визуальным ожиданиям."],
  ["03", "Подписание договора", "Наш клиент защищён от сорванных сроков и недопониманий — все условия фиксируются документально."],
  ["04", "Согласование чертежей", "Этап помогает увидеть мебель максимально реалистично и при необходимости попросить конструктора внести правки до запуска в производство."],
  ["05", "Предоплата и запуск в производство", "Вносите предоплату — мы запускаем изделие в работу на собственной фабрике в Балашихе."],
  ["06", "Отчёт о ходе работы", "На каждом этапе менеджер присылает фотоотчёт. Вы не переживаете о ходе работы, зная, что всё идёт по плану."],
  ["07", "Упаковка", "Надёжно упаковываем мебель, чтобы она доехала до клиента без единого повреждения."],
  ["08", "Доставка и монтаж", "Команда привезёт мебель в удобное время, соберёт, отпарит и заберёт остатки упаковки. Вы просто наслаждаетесь финальным результатом."],
];

const DESIGNER_LIST = [
  "Железное соблюдение сроков",
  "Всегда на связи",
  "Отчёт о всех этапах изготовления",
];

const REVIEWS = Array.from({ length: 32 }, (_, i) => `/reviews/${String(i + 1).padStart(2, "0")}.jpg?v=2`);

const FAQ_DATA = [
  { q: "Сроки изготовления?", a: "От 14 до 50 рабочих дней — зависит от сложности и уникальности используемых материалов, а также от комплектации вашей мебели." },
  { q: "Возможно ли оплатить в рассрочку?", a: "При оформлении заказа вы вносите предоплату 70%, оставшуюся часть — уже при получении мебели. Если такое деление платежа вам не комфортно, возможен вариант беспроцентной рассрочки — менеджер подберёт оптимальный банк." },
  { q: "Есть ли доставка в другие города?", a: "Да, мы доставляем наши изделия по всей России и СНГ. Доставка до терминала осуществляется транспортными компаниями в вашем городе, после чего вы либо забираете заказ самостоятельно, либо дозаказываете адресную доставку в удобное время и место." },
  { q: "Почему у вас доступные цены?", a: "У нас своя фабрика, и мы работаем без посредников. Это позволяет держать конкурентные рыночные цены, сохраняя достойный уровень качества." },
  { q: "Что делать, если не понравился результат?", a: "Если есть рекламации — претензии к качеству, — мы оперативно разбираемся в ситуации: что произошло, как и в какие сроки можно устранить. Наш отдел качества найдёт решение, которое устроит вас на 100%." },
];

function TelegramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path transform="translate(-2 0.8)" d="M21.94 4.3 18.9 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.18c-.25.25-.46.46-.95.46l.34-4.8 8.74-7.9c.38-.34-.08-.53-.59-.19L6.95 12.9 2.3 11.44c-1.01-.32-1.03-1.01.21-1.5L20.63 3.1c.84-.31 1.58.2 1.31 1.2z" />
    </svg>
  );
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    root.querySelectorAll(".b-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Lightbox({ images, title, initialIndex = 0, tall = false, onClose }) {
  const [idx, setIdx] = useState(initialIndex);
  const n = images.length;
  const prev = useCallback(() => setIdx((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIdx((i) => (i + 1) % n), [n]);
  const touchX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    touchX.current = null;
  };

  return (
    <div className="b-lb" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <button className="b-lb__close" type="button" aria-label="Закрыть" onClick={onClose}>
        <X size={22} />
      </button>
      <div className="b-lb__stage" onClick={(e) => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {n > 1 && (
          <button className="b-lb__nav b-lb__nav--prev" type="button" aria-label="Назад" onClick={prev}>
            <ChevronLeft size={26} />
          </button>
        )}
        <img
          className={`b-lb__img${tall ? " b-lb__img--tall" : ""}`}
          src={images[idx]}
          alt={`${title} — фото ${idx + 1}`}
        />
        {n > 1 && (
          <button className="b-lb__nav b-lb__nav--next" type="button" aria-label="Вперёд" onClick={next}>
            <ChevronRight size={26} />
          </button>
        )}
      </div>
      <div className="b-lb__bar" onClick={(e) => e.stopPropagation()}>
        <span className="b-lb__title">{title}</span>
        <span className="b-lb__count">{idx + 1} / {n}</span>
      </div>
    </div>
  );
}

function ProdVideo({ n, active, setActive }) {
  const ref = useRef(null);
  const isActive = !!active && active.n === n;
  const sound = isActive && active.sound;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (isActive) {
      v.muted = !sound;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
      v.muted = true;
      try { v.currentTime = 0; } catch {}
    }
  }, [isActive, sound]);

  return (
    <div
      className={`b-vcard${isActive ? " b-vcard--playing" : ""}${sound ? " b-vcard--sound" : ""}`}
      onMouseEnter={() => setActive((a) => (a && a.n === n) ? a : { n, sound: false })}
      onMouseLeave={() => setActive((a) => (a && a.n === n) ? null : a)}
      onClick={() => setActive((a) => (a && a.n === n && a.sound) ? null : { n, sound: true })}
    >
      <video
        ref={ref}
        src={`/videos/prod-${n}.mp4`}
        poster={`/videos/poster-${n}.jpg`}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`Видео с производства №${n}`}
      />
      <span className="b-vcard__play"><Play size={20} fill="currentColor" /></span>
      <span className="b-vcard__sound" aria-hidden="true">
        {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </span>
    </div>
  );
}

const projectImages = (p) =>
  Array.from({ length: p.count }, (_, i) => `/projects/${p.slug}/${i + 1}.jpg?v=2`);

export default function App() {
  const pageRef = useReveal();
  const [openFaq, setOpenFaq] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [cookieAck, setCookieAck] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [reviewIdx, setReviewIdx] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      setCookieAck(localStorage.getItem("cf_cookie_ack") === "1");
    } catch { setCookieAck(true); }
  }, []);

  const acceptCookies = () => {
    try { localStorage.setItem("cf_cookie_ack", "1"); } catch {}
    setCookieAck(true);
  };

  const ALLOWED_FILE = /\.(pdf|jpe?g|png|webp|gif|docx?|xlsx?|pptx?|zip|rar)$/i;
  const FILE_MAX_MB = 20;

  const onFile = (e) => {
    setFileError("");
    const f = e.target.files && e.target.files[0];
    if (!f) { setFile(null); return; }
    if (!ALLOWED_FILE.test(f.name)) {
      setFileError("Можно прикрепить PDF, изображение, документ Office, ZIP/RAR.");
      setFile(null); e.target.value = ""; return;
    }
    if (f.size > FILE_MAX_MB * 1024 * 1024) {
      setFileError(`Файл больше ${FILE_MAX_MB} МБ — уменьшите или пришлите ссылку.`);
      setFile(null); e.target.value = ""; return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const res = String(reader.result);
      setFile({ name: f.name, type: f.type, dataB64: res.slice(res.indexOf(",") + 1) });
    };
    reader.onerror = () => setFileError("Не удалось прочитать файл.");
    reader.readAsDataURL(f);
  };

  const removeFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitLead = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get("name") || "").toString(),
      phone: (fd.get("phone") || "").toString(),
      company: (fd.get("company") || "").toString(),
      file: file ? { name: file.name, type: file.type, dataB64: file.dataB64 } : undefined,
    };
    setSending(true);
    setFormError(false);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("bad");
      setFormSent(true);
      reach("lead_submit");
      if (payload.file) reach("lead_submit_file");
      removeFile();
    } catch {
      setFormError(true);
      reach("lead_error");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowTop(y > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onContactClick = (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) reach("phone_click");
      else if (href.startsWith("mailto:")) reach("email_click");
      else if (href.includes("t.me/")) reach("telegram_click");
      else if (href.includes("wa.me/")) reach("whatsapp_click");
      else if (href === "#form") reach("form_open");
    };
    document.addEventListener("click", onContactClick);
    return () => document.removeEventListener("click", onContactClick);
  }, []);

  useEffect(() => {
    const isInput = (t) => t && t.closest && t.closest("input, textarea, [contenteditable]");
    const blockCopy = (e) => {
      if (isInput(e.target)) return;
      e.preventDefault();
      const note = "© ЧЕСТНАЯ ФАБРИКА — производство мягкой мебели, Балашиха. Копирование материалов сайта запрещено.";
      if (e.clipboardData) e.clipboardData.setData("text/plain", note);
    };
    const blockDrag = (e) => { if (e.target && e.target.tagName === "IMG") e.preventDefault(); };
    const dev = new URLSearchParams(window.location.search).get("dev") === "1";
    if (dev) return;
    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("dragstart", blockDrag);
    return () => {
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, []);

  return (
    <div className={`cf-page${typeof window !== "undefined" && new URLSearchParams(window.location.search).get("dev") === "1" ? " cf-page--dev" : ""}`} ref={pageRef}>
      <header className={`b-header${scrolled ? " b-header--solid" : ""}`}>
        <div className="b-wrap b-header__row">
          <a href="#top" className="b-logo">
            <span className="b-logo__dot" />
            ЧЕСТНАЯ ФАБРИКА
          </a>
          <nav className="b-nav">
            <a href="#video">Производство</a>
            <a href="#portfolio">Проекты</a>
            <a href="#steps">Этапы</a>
            <a href="#designers">Дизайнерам</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="b-header__cta">
            <a className="b-iconcircle" href="https://t.me/+79959008200" target="_blank" rel="noopener" aria-label="Telegram"><TelegramIcon size={16} /></a>
            <a className="b-btn" href="#form">Оставить заявку</a>
          </div>
        </div>
      </header>

      <section className="b-hero" id="top">
        <div className="b-hero__bg">
          <img src={HERO_IMG} alt="" loading="eager" />
          <span className="b-hero__veil" />
        </div>
        <div className="b-wrap b-hero__inner b-reveal">
          <span className="b-label">собственная фабрика · Балашиха</span>
          <h1 className="b-h1 b-hero__title">
            ИЗГОТОВЛЕНИЕ <span className="b-grad">МЯГКОЙ МЕБЕЛИ</span> НА ЗАКАЗ
          </h1>
          <p className="b-hero__sub">Лучшее соотношение цены и качества</p>
          <a href="#form" className="b-btn b-btn--lg b-hero__btn">
            Рассчитать <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="b-wrap b-hero__stats b-reveal">
          <div className="b-stat">
            <div className="b-stat__num">1200 м²</div>
            <div className="b-stat__lbl">Собственное производство в г. Балашиха</div>
          </div>
          <div className="b-stat">
            <div className="b-stat__num">25 лет</div>
            <div className="b-stat__lbl">Делаем мягкую мебель</div>
          </div>
          <div className="b-stat">
            <div className="b-stat__num">от 14 дней</div>
            <div className="b-stat__lbl">Сроки изготовления</div>
          </div>
        </div>
      </section>

      <section className="b-video" id="video">
        <div className="b-wrap">
          <div className="b-video__head b-reveal">
            <div>
              <span className="b-label">видео с производства</span>
              <h2 className="b-h2">КАК МЫ <span className="b-grad">РАБОТАЕМ</span></h2>
            </div>
            <a href="#form" className="b-btn b-video__head-btn">
              <Send size={16} /> Отправить фото/проект на просчёт
            </a>
          </div>
        </div>
        <div className="b-video__carousel b-reveal">
          {PROD_VIDEOS.map((n) => (
            <ProdVideo key={n} n={n} active={activeVideo} setActive={setActiveVideo} />
          ))}
        </div>
      </section>

      <section className="b-about" id="about">
        <div className="b-about__inner">
          <div className="b-reveal">
            <span className="b-label b-label--light">о нас</span>
            <h2 className="b-h2 b-about__title">
              РЕАЛИЗУЕМ <span className="b-grad">В ТОЧНОСТИ ДО 100%</span> мебель
              с любой картинки или дизайн-проекта
            </h2>
            <ul className="b-about__list">
              {ABOUT_LIST.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            <a href="#form" className="b-btn b-btn--white b-about__btn">
              Рассчитать проект <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="b-port" id="portfolio">
        <div className="b-wrap">
          <div className="b-port__head b-reveal">
            <div>
              <span className="b-label">портфолио</span>
              <h2 className="b-h2"><span className="b-grad">1200+</span> РЕАЛИЗОВАННЫХ проектов</h2>
            </div>
            <a href="#form" className="b-btn b-btn--ghost">
              Запросить полный каталог <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="b-port__scroller b-reveal">
          <div className="b-port__grid">
            {REAL_PROJECTS.map((p, i) => (
              <button
                type="button"
                key={p.slug}
                className="b-pcard b-pcard--real"
                onClick={() => setGallery(p)}
                aria-label={`${p.name} — открыть галерею, фото: ${p.count}`}
              >
                <img src={`/projects/${p.slug}/cover.jpg?v=2`} alt={p.name} loading="lazy" />
                <span className="b-pcard__num">№{String(i + 1).padStart(2, "0")}</span>
                <span className="b-pcard__gal"><Images size={13} /> {p.count}</span>
                <div className="b-pcard__name">{p.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="b-form" id="form">
        <div className="b-form__inner b-reveal">
          <div className="b-form__bg" aria-hidden="true">
            <img
              src="/img/atelier.jpg"
              alt=""
              loading="lazy"
            />
            <span className="b-form__veil" />
          </div>
          <div className="b-form__text">
            <span className="b-label b-label--light">обратная связь</span>
            <h2 className="b-h2">ЕСТЬ ГОТОВЫЙ <span className="b-grad">ДИЗАЙН-ПРОЕКТ?</span></h2>
            <p>
              Мы бесплатно просчитаем его прямо сейчас. Если готового проекта
              нет — предложим свои варианты мебели для вашего интерьера.
            </p>
          </div>
          {formSent ? (
            <div className="b-form__success">
              <CheckCircle size={40} />
              <h3>Заявка отправлена</h3>
              <p>Менеджер свяжется с вами в ближайшее время.</p>
              <button type="button" className="b-btn b-btn--ghost" onClick={() => setFormSent(false)}>
                Отправить ещё
              </button>
            </div>
          ) : (
            <form className="b-form__fields" onSubmit={submitLead}>
              <input className="b-input" type="text" name="name" placeholder="Имя *" required />
              <input className="b-input" type="tel" name="phone" placeholder="Номер телефона *" required />
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              {file ? (
                <div className="b-file__chip">
                  <span className="b-file__name"><Paperclip size={14} /> {file.name}</span>
                  <button type="button" onClick={removeFile} aria-label="Убрать файл">
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <label className="b-file">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                    onChange={onFile}
                    hidden
                  />
                  <span className="b-file__btn">
                    <Paperclip size={16} /> Прикрепить дизайн-проект
                  </span>
                </label>
              )}
              {fileError && <p className="b-form__error">{fileError}</p>}
              <button className="b-btn b-btn--lg" type="submit" disabled={sending}>
                {sending ? "Отправляем…" : <>Оставить заявку <ArrowUpRight size={16} /></>}
              </button>
              {formError && (
                <p className="b-form__error">
                  Не удалось отправить заявку. Позвоните нам:{" "}
                  <a href="tel:+79959008200">+7 (995) 900-82-00</a>
                </p>
              )}
              <p className="b-form__legal">
                Нажимая «Оставить заявку», вы соглашаетесь с{" "}
                <a href="/privacy/" target="_blank" rel="noopener">политикой обработки персональных данных</a>
                {" "}и даёте <a href="/consent/" target="_blank" rel="noopener">согласие на обработку персональных данных</a>.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="b-steps" id="steps">
        <div className="b-wrap">
          <div className="b-steps__head b-reveal">
            <span className="b-label">этапы</span>
            <h2 className="b-h2">ПРОЗРАЧНОСТЬ <span className="b-grad">на каждом этапе</span></h2>
          </div>
          <div className="b-steps__grid">
            {STEPS.map(([num, title, text]) => (
              <div key={num} className="b-step-wrap b-reveal">
                <div className="b-step">
                  <div className="b-step__header">
                    <div className="b-step__title">{title}</div>
                    <div className="b-step__num">{num}</div>
                  </div>
                  <div className="b-step__text">{text}</div>
                </div>
                <span className="b-step__plus" aria-hidden="true"><Plus size={20} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="b-designers" id="designers">
        <div className="b-wrap">
          <div className="b-designers__inner b-reveal">
            <div className="b-designers__text">
              <span className="b-label b-label--light">для дизайнеров</span>
              <h2 className="b-h2 b-designers__title">
                СОТРУДНИЧЕСТВО <span className="b-grad">С ДИЗАЙНЕРАМИ</span>
              </h2>
              <p className="b-designers__lead">Мы бережём ваше время и нервы:</p>
              <ul className="b-designers__list">
                {DESIGNER_LIST.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
              <p className="b-designers__pitch">
                Сотрудничая с нами, вы получаете не просто исполнителя,
                а партнёра, с которым не стыдно за результат перед клиентом.
              </p>
              <a href="#form" className="b-btn b-btn--lg b-btn--white">
                Хочу узнать условия сотрудничества <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="b-designers__media">
              <img
                src="/designers.png?v=7"
                alt="Приложение «Честная Фабрика» — согласование чертежей дивана и расчёт стоимости"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="b-reviews" id="reviews">
        <div className="b-wrap">
          <div className="b-reviews__head b-reveal">
            <span className="b-label">отзывы</span>
            <h2 className="b-h2">НАМ ДОВЕРЯЮТ. <span className="b-grad">И не ошибаются в своём выборе</span></h2>
          </div>
        </div>
        <div className="b-reviews__carousel b-reveal">
          {REVIEWS.map((src, i) => (
            <button type="button" key={i} className="b-revcard" onClick={() => setReviewIdx(i)} aria-label={`Открыть отзыв ${i + 1}`}>
              <img src={src} alt={`Отзыв клиента ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <section className="b-faq" id="faq">
        <div className="b-faq__inner">
          <div className="b-faq__left b-reveal">
            <span className="b-label">FAQ</span>
            <h2 className="b-h2">ОТВЕЧАЕМ <span className="b-grad">на вопросы</span></h2>
            <p className="b-faq__hint">
              Если не нашли ответа — оставьте заявку, менеджер свяжется
              и всё расскажет.
            </p>
            <a className="b-btn" href="#form">Задать вопрос</a>
          </div>
          <div className="b-faq__items b-reveal">
            {FAQ_DATA.map((f, i) => (
              <div className={`b-faq__item ${openFaq === i ? "b-faq__item--open" : ""}`} key={i}>
                <button
                  type="button"
                  className="b-faq__row"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span className="b-faq__q">{f.q}</span>
                  <span className="b-faq__toggle">
                    {openFaq === i ? <X size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {openFaq === i && <div className="b-faq__a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="b-contacts" id="contacts">
        <div className="b-contacts__map" aria-hidden="true">
          <iframe
            title="Карта — Балашиха, Ласточкин проезд"
            src="https://yandex.ru/map-widget/v1/?ll=37.965%2C55.792&z=14"
            loading="lazy"
            allow="geolocation"
          />
        </div>
        <div className="b-wrap b-contacts__inner">
          <div className="b-contacts__info b-reveal">
            <span className="b-label">контакты</span>
            <h2 className="b-h2">КОНТАКТЫ</h2>
            <div className="b-contacts__rows">
              <div className="b-contact-row">
                <span className="b-contact-row__lbl"><Phone size={13} /> Телефон</span>
                <a href="tel:+79959008200">+7 (995) 900-82-00</a>
              </div>
              <div className="b-contact-row">
                <span className="b-contact-row__lbl"><TelegramIcon size={13} /> Telegram</span>
                <a href="https://t.me/+79959008200" target="_blank" rel="noopener">Написать в Telegram</a>
              </div>
              <div className="b-contact-row">
                <span className="b-contact-row__lbl"><Mail size={13} /> Почта</span>
                <a href="mailto:chestnofabrika@gmail.com">chestnofabrika@gmail.com</a>
              </div>
              <div className="b-contact-row">
                <span className="b-contact-row__lbl"><MapPin size={13} /> Адрес</span>
                <span className="b-contact-row__val">г. Балашиха, Ласточкин пр-д, вл. 6, стр. 1</span>
              </div>
            </div>
            <a href="#form" className="b-btn b-btn--lg b-contacts__btn">
              Оставить заявку <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="b-footer">
        <div className="b-wrap">
          <div className="b-footer__grid">
            <div>
              <a href="#top" className="b-logo b-logo--light">
                <span className="b-logo__dot" />
                ЧЕСТНАЯ ФАБРИКА
              </a>
              <a className="b-footer__phone" href="tel:+79959008200">+7 (995) 900-82-00</a>
              <a className="b-footer__call" href="#form">Заказать звонок</a>
              <div className="b-footer__addr">
                Мягкая мебель на заказ — диваны, кресла, кровати, банкетки.
                Собственное производство в Балашихе.
              </div>
            </div>
            <div className="b-footer__col">
              <h4>Разделы</h4>
              <a href="#video">Производство</a>
              <a href="#portfolio">Проекты</a>
              <a href="#steps">Этапы</a>
            </div>
            <div className="b-footer__col">
              <h4>Компания</h4>
              <a href="#about">О нас</a>
              <a href="#designers">Дизайнерам</a>
              <a href="#reviews">Отзывы</a>
            </div>
            <div className="b-footer__col">
              <h4>Контакты</h4>
              <a href="mailto:chestnofabrika@gmail.com">
                <Mail size={14} /> chestnofabrika@gmail.com
              </a>
              <a href="https://t.me/+79959008200" target="_blank" rel="noopener">
                <TelegramIcon size={14} /> Telegram
              </a>
              <a href="#contacts">
                <MapPin size={14} /> Балашиха, Ласточкин пр-д
              </a>
            </div>
          </div>
          <div className="b-footer__bottom">
            <span>© 2019—{new Date().getFullYear()} ЧЕСТНАЯ ФАБРИКА · ИП Большакова Д. А. · ИНН 662336973690 · Все права защищены. Копирование материалов запрещено.</span>
            <nav className="b-footer__legal">
              <a href="/privacy/">Политика ПДн</a>
              <a href="/consent/">Согласие на обработку</a>
              <a href="/cookies/">Cookie</a>
            </nav>
            <div className="b-footer__socials">
              <a href="https://t.me/+79959008200" target="_blank" rel="noopener" aria-label="Telegram"><TelegramIcon size={16} /></a>
              <a href="https://wa.me/79959008200" target="_blank" rel="noopener" aria-label="WhatsApp"><MessageCircle size={16} /></a>
            </div>
          </div>
        </div>
      </footer>

      <button
        className={`b-totop${showTop ? " b-totop--show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Наверх"
      >
        <ArrowUp size={20} />
      </button>

      {gallery && (
        <Lightbox images={projectImages(gallery)} title={gallery.name} onClose={() => setGallery(null)} />
      )}
      {reviewIdx !== null && (
        <Lightbox images={REVIEWS} title="Реальный отзыв клиента" initialIndex={reviewIdx} tall onClose={() => setReviewIdx(null)} />
      )}

      {!cookieAck && (
        <div className="b-cookie" role="dialog" aria-label="Уведомление об использовании cookie">
          <p className="b-cookie__text">
            Мы используем файлы cookie для корректной работы сайта и аналитики.
            Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <a href="/cookies/" target="_blank" rel="noopener">Политикой cookie</a> и{" "}
            <a href="/privacy/" target="_blank" rel="noopener">обработкой персональных данных</a>.
          </p>
          <button type="button" className="b-btn b-cookie__btn" onClick={acceptCookies}>
            Принять
          </button>
        </div>
      )}
    </div>
  );
}
