/*
    script.js
    作用：给门户网站增加交互功能

    当前功能：
    1. 自动高亮当前页面对应的导航链接
    2. 自动创建“返回顶部”按钮
    3. 自动创建“暗色模式”按钮
    4. 使用 localStorage 记住用户是否开启暗色模式
*/


/* =========================
   1. 当前导航高亮
   ========================= */

/*
   window.location.pathname 可以获取当前网页路径
   例如：
   /my-portal/index.html
   /my-portal/notes.html
*/
const currentPath = window.location.pathname;

/*
   document.querySelectorAll("nav a")
   意思是：找到页面里 nav 导航栏中的所有 a 链接
*/
const navLinks = document.querySelectorAll("nav a");

/*
   forEach 是遍历
   意思是：把每一个导航链接都检查一遍
*/
navLinks.forEach(function (link) {

    /*
       link.getAttribute("href") 获取链接的 href
       例如 index.html、notes.html、about.html
    */
    const linkHref = link.getAttribute("href");

    /*
       如果当前页面路径包含这个链接名，就给它加 active 类
       例如当前是 notes.html，就让“学习笔记”高亮
    */
    if (currentPath.includes(linkHref)) {
        link.classList.add("active");
    }

    /*
       特殊情况：
       如果访问的是 /my-portal/，实际打开的是 index.html
       这时路径里可能没有 index.html，所以单独处理首页
    */
    if (
        (currentPath.endsWith("/") || currentPath.endsWith("/my-portal/"))
        && linkHref === "index.html"
    ) {
        link.classList.add("active");
    }
});


/* =========================
   2. 创建返回顶部按钮
   ========================= */

/*
   document.createElement("button")
   意思是：用 JavaScript 创建一个 button 按钮
*/
const backToTopButton = document.createElement("button");

/*
   设置按钮上的文字
*/
backToTopButton.textContent = "↑";

/*
   给按钮添加 class 名字
   CSS 会根据这个 class 控制它的样式
*/
backToTopButton.className = "back-to-top";

/*
   把这个按钮加入到网页 body 里面
*/
document.body.appendChild(backToTopButton);

/*
   window.addEventListener("scroll", ...)
   意思是：监听用户滚动网页这个动作
*/
window.addEventListener("scroll", function () {

    /*
       window.scrollY 表示页面向下滚动了多少像素
       如果滚动超过 300px，就显示按钮
       否则隐藏按钮
    */
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

/*
   点击返回顶部按钮后，平滑滚动到页面顶部
*/
backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================
   3. 创建暗色模式按钮
   ========================= */

/*
   创建一个暗色模式按钮
*/
const themeButton = document.createElement("button");

/*
   设置按钮文字
*/
themeButton.textContent = "暗色模式";

/*
   添加 class，方便 CSS 控制样式
*/
themeButton.className = "theme-toggle";

/*
   把按钮加入网页
*/
document.body.appendChild(themeButton);

/*
   localStorage 是浏览器本地存储
   可以记住用户上次选择
*/
const savedTheme = localStorage.getItem("theme");

/*
   如果之前保存的是 dark，就自动开启暗色模式
*/
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "亮色模式";
}

/*
   点击按钮时，切换暗色模式
*/
themeButton.addEventListener("click", function () {

    /*
       toggle 的意思是：
       有 dark-mode 就移除
       没有 dark-mode 就添加
    */
    document.body.classList.toggle("dark-mode");

    /*
       判断当前是否处于暗色模式
    */
    const isDark = document.body.classList.contains("dark-mode");

    /*
       根据状态改变按钮文字，并保存用户选择
    */
    if (isDark) {
        themeButton.textContent = "亮色模式";
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "暗色模式";
        localStorage.setItem("theme", "light");
    }
});