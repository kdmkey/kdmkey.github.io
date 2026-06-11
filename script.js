/* =========================
   DOM READY（UI系まとめ）
========================= */
document.addEventListener("DOMContentLoaded", function () {

  /* ===== スクロールヘッダー ===== */
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ===== ハンバーガー ===== */
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll(".menu a");

  if (hamburger && menu) {

    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      menu.classList.toggle("active");
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        menu.classList.remove("active");
      });
    });

    document.body.addEventListener("click", function () {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    });

    menu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  /* ===== フォームチェック ===== */
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (e) {

      const name = form.name.value.trim();
      const email = form.email.value.trim();

      if (name.length < 2) {
        alert("お名前を正しく入力してください");
        e.preventDefault();
        return;
      }

      if (!email.includes("@")) {
        alert("正しいメールアドレスを入力してください");
        e.preventDefault();
        return;
      }
    });
  }

  /* ===== 同意チェック ===== */
  const checkbox = document.getElementById("agree");
  const button = document.getElementById("submitBtn");

  if (checkbox && button) {
    checkbox.addEventListener("change", function () {
      button.disabled = !checkbox.checked;
    });
  }

  /* ===== スライド ===== */
  const slides = document.querySelectorAll(".slide");
  let current = 0;

  if (slides.length > 0) {

    function changeSlide() {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }

    setInterval(changeSlide, 3000);
  }

});


/* =========================
   HOME BACKGROUND CANVAS
========================= */
window.addEventListener("load", function () {

  const canvas = document.getElementById("bg");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let dots = [];

  const colors = [
    "rgba(0,0,0,0.2)",
    "rgba(255,120,0,0.2)",
    "rgba(120,0,255,0.2)"
  ];

  let lastWidth = 0;

  function resizeCanvas() {

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    if (width === lastWidth) return;

    lastWidth = width;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createDots() {

    dots = [];

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    for (let i = 0; i < 200; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animateCanvas() {

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(dot => {

      dot.x += dot.dx;
      dot.y += dot.dy;

      if (dot.x < 0 || dot.x > width) dot.dx *= -1;
      if (dot.y < 0 || dot.y > height) dot.dy *= -1;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();

    });

    requestAnimationFrame(animateCanvas);
  }

  requestAnimationFrame(() => {
    resizeCanvas();
    createDots();
    animateCanvas();
  });

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("orientationchange", resizeCanvas);

});

/* =========================
   MODAL
========================= */
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");

  if (!modal || !closeBtn) return;

  setTimeout(() => {
    modal.classList.add("show");
  }, 300);

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

});


/* =========================
   BOUNCING SVG
========================= */
document.addEventListener("DOMContentLoaded", function () {

  const ball = document.getElementById("ball");
  if (!ball) return;

  let x = 100;
  let y = 100;

  const isPC = window.innerWidth > 768;
  const speed = isPC ? 1.6 : 1;

  let vx = 1.5 * speed;
  let vy = 1 * speed;

  let canShake = true;

  function shake() {
    document.body.classList.add("shake");

    setTimeout(() => {
      document.body.classList.remove("shake");
    }, isPC ? 200 : 300);
  }

  function moveBall() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const rect = ball.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    x += vx;
    y += vy;

    if (x <= 0 || x + w >= width) vx *= -1;

    if (y <= 0) {
      vy *= -1;
    }

    if (y + h >= height) {

      if (canShake) {
        shake();
        canShake = false;

        setTimeout(() => {
          canShake = true;
        }, isPC ? 150 : 300);
      }

      vy *= -1;
      y = height - h;
    }

    ball.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(moveBall);
  }

  moveBall();

});

function updateFukuokaClock() {
  const now = new Date();

  const options = {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  const parts = new Intl.DateTimeFormat('en-US', options)
    .formatToParts(now);

  const get = type =>
    parts.find(p => p.type === type)?.value;

  const date =
    `${get('month')}/${get('day')}/${get('year')}`;

  const time =
    `${get('hour')}:${get('minute')}${get('dayPeriod').toLowerCase()}`;

  document.getElementById('fukuoka-clock').textContent =
    `${date} ${time} FUK`;
}

updateFukuokaClock();
setInterval(updateFukuokaClock, 1000);

