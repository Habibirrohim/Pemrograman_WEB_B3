const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Pastikan Anda memiliki koneksi database yang benar

// Render halaman register
router.get('/register', (req, res) => {
    res.render('register'); // Render halaman pendaftaran
});

// Proses register user
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
        return res.render('register', { error: 'Please fill in all fields.' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Query untuk menyimpan pengguna baru
    const query = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.render('register', { error: 'Error registering user.' });
        }
        res.redirect('/auth/login'); // Redirect ke halaman login setelah berhasil mendaftar
    });
});

// Render halaman login
router.get('/login', (req, res) => {
    res.render('login'); // Render halaman login
});

router.get('/mangrov/index', (req, res) => {
    res.render('index'); // Render halaman index
});

router.get('/mangrov/add', (req, res) => {
    res.render('add'); // Render halaman index
});

router.get('/mangrov/edit', (req, res) => {
    res.render('edit'); // Render halaman index
});

// Proses login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query untuk mencari pengguna berdasarkan username
    const query = "SELECT * FROM user WHERE username = ?";
    db.query(query, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.render('login', { error: 'Error logging in.' });
        }

        if (result.length > 0) {
            const user = result[0];

            // Bandingkan password yang dimasukkan dengan password yang di-hash
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user; // Simpan informasi pengguna di session
                return res.redirect('/home'); // Redirect ke halaman utama setelah login berhasil
            } else {
                return res.render('login', { error: 'Incorrect password' });
            }
        } else {
            return res.render('login', { error: 'User not found' });
        }
    });
});


// Proses logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/auth/login'); // Redirect ke halaman login setelah logout
    });
});

module.exports = router;