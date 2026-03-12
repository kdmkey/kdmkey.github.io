    window.addEventListener("scroll", function(){

    const header = document.querySelector(".header");
    
    if(window.scrollY > 50){
    header.classList.add("scrolled");
    }else{
    header.classList.remove("scrolled");
    }
    
    });

    /* ハンバーガー */
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const links = document.querySelectorAll(".menu a");
    
    /* ハンバーガークリック */
    hamburger.addEventListener("click", function(e){
    
    e.stopPropagation(); // bodyクリック防止
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

    /* メニュー内クリックは閉じない */
    const form = document.querySelector("form");

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

    const checkbox = document.getElementById("agree");
    const button = document.getElementById("submitBtn");
    
    checkbox.addEventListener("change", function(){
    button.disabled = !checkbox.checked;
    });