document.addEventListener("DOMContentLoaded", function() {
    const halaman1Link = document.querySelector("a[href='/Halaman1/index.html']");
    const halaman3Link = document.querySelector("a[href='/Halaman3/index3.html']");

    halaman1Link.addEventListener("click", function(event) {
        alert("Anda akan menuju ke Halaman 1");
    });

    halaman3Link.addEventListener("click", function(event) {
        alert("Anda akan menuju ke Halaman 3");
    });
});
