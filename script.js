/* DOM読み込み後に実行 */
document.addEventListener("DOMContentLoaded", function(){

  /* スクロールでヘッダー変化 */
  window.addEventListener("scroll", function(){
  
  const header = document.querySelector(".header");
  
  if(header){
    if(window.scrollY > 50){
      header.classList.add("scrolled");
    }else{
      header.classList.remove("scrolled");
    }
  }
  
  });
  
  /* ハンバーガー */
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll(".menu a");
  
  if(hamburger && menu){
  
  hamburger.addEventListener("click", function(e){
  
  e.stopPropagation();
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
  
  });
  
  /* メニュークリックで閉じる */
  links.forEach(function(link){
  
  link.addEventListener("click", function(){
  
  hamburger.classList.remove("active");
  menu.classList.remove("active");
  
  });
  
  });
  
  /* bodyクリックで閉じる */
  document.body.addEventListener("click", function(){
  
  hamburger.classList.remove("active");
  menu.classList.remove("active");
  
  });
  
  /* メニュー内クリックは閉じない */
  menu.addEventListener("click", function(e){
  e.stopPropagation();
  });
  
  }
  
  /* フォーム送信チェック */
  const form = document.querySelector("form");
  
  if(form){
  
  form.addEventListener("submit", function(e){
  
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  
  if(name.length < 2){
  alert("お名前を正しく入力してください");
  e.preventDefault();
  return;
  }
  
  if(!email.includes("@")){
  alert("正しいメールアドレスを入力してください");
  e.preventDefault();
  return;
  }
  
  });
  
  }
  
  /* 同意チェック */
  const checkbox = document.getElementById("agree");
  const button = document.getElementById("submitBtn");
  
  if(checkbox && button){
  
  checkbox.addEventListener("change", function(){
  button.disabled = !checkbox.checked;
  });
  
  }

  /* スライド */
  const slides = document.querySelectorAll(".slide");
  let current = 0;

  if(slides.length > 0){

    function changeSlide(){
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }

    setInterval(changeSlide, 3000);

  }

  /* ========================= */
  /* 上スクロール制御（HOMEのみ） */
  /* ========================= */

  if (document.body.classList.contains("home")) {

    let lastY = 0;
    const HEADER_TRIGGER = 80;

    document.addEventListener('touchstart', function(e) {
      lastY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(e) {

      const currentY = e.touches[0].clientY;
      const scrollTop = window.scrollY;

      if (currentY > lastY) {
        if (scrollTop <= HEADER_TRIGGER) {
          e.preventDefault();
        }
      }

      lastY = currentY;

    }, { passive: false });

  }

});

/* HOME背景 */

window.addEventListener("load", function(){

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let dots = [];

/* 色 */
const colors = [
"rgba(0,0,0,0.2)",
"rgba(255,120,0,0.2)",
"rgba(120,0,255,0.2)"
];

/* サイズ調整（Safari対策済み） */
let lastWidth = 0;

function resizeCanvas(){

  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect(); // ←重要変更

  const width = rect.width;
  const height = rect.height;

  if(width === lastWidth) return;

  lastWidth = width;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.setTransform(dpr,0,0,dpr,0,0);

}

/* 初期化（遅延して安定させる） */
requestAnimationFrame(() => {
  resizeCanvas();
  createDots();
});

/* resize対応 */
window.addEventListener("resize", resizeCanvas);
window.addEventListener("orientationchange", resizeCanvas);

/* ドット生成 */
function createDots(){
  dots = [];

  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  for(let i=0;i<200;i++){
    dots.push({
      x:Math.random()*width,
      y:Math.random()*height,
      r:Math.random()*2+0.5,
      dx:(Math.random()-0.5)*0.6,
      dy:(Math.random()-0.5)*0.6,
      color:colors[Math.floor(Math.random()*colors.length)]
    });
  }
}

/* アニメーション */
function animate(){

  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  dots.forEach(dot=>{

    dot.x += dot.dx;
    dot.y += dot.dy;

    if(dot.x < 0 || dot.x > width) dot.dx *= -1;
    if(dot.y < 0 || dot.y > height) dot.dy *= -1;

    ctx.beginPath();
    ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2);
    ctx.fillStyle = dot.color;
    ctx.fill();

  });

  requestAnimationFrame(animate);

}

animate();

});