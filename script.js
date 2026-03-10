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