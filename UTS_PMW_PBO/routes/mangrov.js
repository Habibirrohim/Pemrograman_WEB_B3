const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan file konfigurasi ini sudah benar

// Middleware untuk cek authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
};

// 2. Tampilkan form untuk menambah data lokasi
router.get('/add', isAuthenticated, (req, res) => {
    res.render('mangrove/add');
});

// 1. Halaman utama untuk menampilkan data lokasi mangrove
router.get('/index', isAuthenticated, (req, res) => {
    const query = 'SELECT * FROM mangrove_locations ORDER BY id ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.render('mangrov/index', { 
            locations: results,
            user: req.session.user 
        });
    });
});


// 3. Proses tambah data lokasi baru
router.post('/add', isAuthenticated, (req, res) => {
    const { location_name, latitude, longitude, description } = req.body;
    const query = 'INSERT INTO mangrove_locations (location_name, latitude, longitude, description) VALUES (?, ?, ?, ?)';
    db.query(query, [location_name, latitude, longitude, description], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error adding location' });
        }
        res.redirect('/mangrove/index');
    });
});

// 4. Tampilkan form edit data lokasi
router.get('/edit/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM mangrove_locations WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error fetching location' });
        }
        res.render('mangrove/edit', { location: results[0] });
    });
});

// 5. Proses update data lokasi
router.post('/edit/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const { location_name, latitude, longitude, description } = req.body;
    const query = 'UPDATE mangrove_locations SET location_name = ?, latitude = ?, longitude = ?, description = ? WHERE id = ?';
    db.query(query, [location_name, latitude, longitude, description, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error updating location' });
        }
        res.redirect('/mangrove/index');
    });
});

// 6. Hapus data lokasi
router.get('/delete/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM mangrove_locations WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting location' });
        }
        res.redirect('/mangrove/index');
    });
});

module.exports = router;
