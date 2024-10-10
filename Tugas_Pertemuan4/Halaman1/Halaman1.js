document.addEventListener("DOMContentLoaded", function() {
    const halaman2Link = document.querySelector("a[href='/Halaman2/index2.html']");
    const halaman3Link = document.querySelector("a[href='/Halaman3/index3.html']");

    halaman2Link.addEventListener("click", function(event) {
        alert("Anda akan menuju ke Halaman 2");
    });

    halaman3Link.addEventListener("click", function(event) {
        alert("Anda akan menuju ke Halaman 3");
    });
});
