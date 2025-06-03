const sidebar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const close = document.querySelector('.close-sidebar');


menu.addEventListener("click", function() {
    sidebar.classList.remove("close-sidebar")
    sidebar.classList.add("open-sidebar")
})

close.addEventListener("click", function() {
    sidebar.classList.remove("open-sidebar")
    sidebar.classList.add("close-sidebar")
})