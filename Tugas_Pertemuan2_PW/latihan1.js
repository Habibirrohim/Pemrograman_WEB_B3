document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formPanitia");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value;
        const nim = document.getElementById("nim").value;
        const kelas = document.getElementById("kelas").value;
        const alamat = document.getElementById("alamat").value;

        document.getElementById("namaDisplay").textContent = nama;
        document.getElementById("nimDisplay").textContent = nim;
        document.getElementById("kelasDisplay").textContent = kelas;
        document.getElementById("alamatDisplay").textContent = alamat;

        localStorage.setItem("nama", nama);
        localStorage.setItem("nim", nim);
        localStorage.setItem("kelas", kelas);
        localStorage.setItem("alamat", alamat);
    });

    window.addEventListener("load", function() {
        if (localStorage.getItem("nama")) {
            document.getElementById("namaDisplay").textContent = localStorage.getItem("nama");
            document.getElementById("nimDisplay").textContent = localStorage.getItem("nim");
            document.getElementById("kelasDisplay").textContent = localStorage.getItem("kelas");
            document.getElementById("alamatDisplay").textContent = localStorage.getItem("alamat");
        }
    });

    const inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach(input => {
        input.addEventListener("focus", function() {
            input.style.border = "2px solid #007bff";
        });

        input.addEventListener("blur", function() {
            input.style.border = "1px solid #ccc";
        });
    });
});
