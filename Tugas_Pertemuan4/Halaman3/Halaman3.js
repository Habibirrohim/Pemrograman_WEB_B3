document.addEventListener("DOMContentLoaded", function() {
    const halaman1Link = document.querySelector("a[href='/Halaman1/index.html']");
    const halaman2Link = document.querySelector("a[href='/Halaman2/index2.html']");

    halaman1Link.addEventListener("click", function(event) {
        alert("Anda akan menuju ke Halaman 1");
    });

    halaman2Link.addEventListener("click", function(event) {
        alert("Anda akan menuju ke Halaman 2");
    });
});
