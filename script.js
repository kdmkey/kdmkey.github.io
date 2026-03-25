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
    
    });

/* HOME背景 */

window.addEventListener("load", function(){

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let dots = [];

/* 色3種類 */
const colors = [
"rgba(0,0,0,0.2)",
"rgba(255,120,0,0.2)",
"rgba(120,0,255,0.2)"
];

/* canvasサイズ調整 */
function resizeCanvas(){

const dpr = window.devicePixelRatio || 1;

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;

canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

ctx.setTransform(dpr,0,0,dpr,0,0);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* ドット生成 */
for(let i=0;i<100;i++){
dots.push({
x:Math.random()*window.innerWidth,
y:Math.random()*window.innerHeight,
r:Math.random()*2+0.5,
dx:(Math.random()-0.5)*0.6,
dy:(Math.random()-0.5)*0.6,
color:colors[Math.floor(Math.random()*colors.length)]
});
}

/* アニメーション */
function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

dots.forEach(dot=>{

dot.x += dot.dx;
dot.y += dot.dy;

if(dot.x < 0 || dot.x > window.innerWidth) dot.dx *= -1;
if(dot.y < 0 || dot.y > window.innerHeight) dot.dy *= -1;

ctx.beginPath();
ctx.arc(dot.x,dot.y,dot.r,0,Math.PI*2);
ctx.fillStyle = dot.color;
ctx.fill();

});

requestAnimationFrame(animate);

}

animate();

});