const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Render halaman register
router.get('/register', (req, res) => {
    res.render('register');
});

// Proses register user
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validasi server-side untuk memastikan input tidak kosong
    if (!username || !email || !password) {
        return res.send('Please fill in all fields.');
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const query = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.redirect('/auth/login'); // Redirect ke halaman login setelah register sukses
    });
});

// Render halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

// Proses login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM user WHERE username = ?";
    db.query(query, [username], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const user = result[0];

            // Periksa password
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user; // Menyimpan user di session
                return res.redirect('/auth/profile'); // Redirect ke halaman profil
            } else {
                return res.send('Incorrect password');
            }
        } else {
            return res.send('User not found');
        }
    });
});

// Render halaman profil
router.get('/profile', (req, res) => {
    if (req.session.user) {
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/auth/login');
    }
});

// ... (kode lainnya tetap sama)

// Proses logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;

// routes/auth.js
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Proses login
    db.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        const user = result[0];
  
        // Periksa password
        if (bcrypt.compareSync(password, user.password)) {
          // Simpan informasi user di session
          req.session.user = user;
  
          // Arahkan user ke halaman profile
          res.redirect('/auth/profile');
        } else {
          res.send('Password salah');
        }
      } else {
        res.send('User tidak ditemukan');
      }
    });
  });
  
  // routes/auth.js
  router.get('/profile', (req, res) => {
    // Periksa apakah user telah login
    if (req.session.user) {
      // Tampilkan halaman profile
      res.render('profile', { user: req.session.user });
    } else {
      // Arahkan user ke halaman login
      res.redirect('/auth/login');
    }
  });