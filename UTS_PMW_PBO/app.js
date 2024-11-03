const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const mangrovRoutes = require('./routes/mangrov');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/auth', authRoutes);
app.use('/mangrov', mangrovRoutes); // Semua rute mangrove


// Root route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.redirect('/auth/login');
    }
});

// Home route
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home');
    } else {
        res.redirect('/auth/login');
    }
});

app.post('/add', (req, res) => {
    const {location_name, latitude, longitude, description} = req.body;
    const query = 'INSERT INTO mangrove_locations (location_name, latitude, longitude, description) VALUES (?, ?, ?, ?)';
    connection.query(query, [location_name, latitude, longitude, description], (err, result) => {
        if(err) throw err;
        res.redirect('/mangrov/index');
    });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
