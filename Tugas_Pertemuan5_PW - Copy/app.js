const express = require (`express`);
const mysql = require(`mysql`);
const bodyParser = require(`body-parser`);
const { name } = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host:`localhost`,
    user: `root`,
    password: ``,
    database: `pertemuan5`
})

connection.connect((err)=>{
    if(err) {
        console.error("eror connecting to Mysql:", err.stack);
        return;
    }
    console.log("Mysql Connected" + connection.threadId);
});

app.set(`view engine`, `ejs`);
//ini adalaha routing (create, read, update, delete)
//READ
app.get(`/`, (req, res) => {
    const query = `SELECT * FROM user`;
    connection.query(query, (err, result) =>{
        res.render(`index`, {user: result});
    });
});

app.listen(3000, () => {
    console.log(" running on port 3000, Buka web melalui http://localhost:3000");
})

//CREATE /INPUT/INSERT
app.post('/add', (req, res) => {
    const { name, email, phone } = req.body;
    const query = `INSERT INTO user (name, email, phone) VALUES (?, ?, ?)`;
    connection.query(query, [name, email, phone], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

//UPDATE 
//untuk akses halaman
app.get('/edit/:id', (req, res) => {
    const query = `SELECT * FROM user WHERE id = ?`;
    connection.query(query, [req.params.id], (err, result) => {
        if(err) throw err;
        res.render('edit', { user: result[0] });
    });
});

//untuk update data
app.post('/update/:id', (req, res) => {
    const { name, email, phone } = req.body;
    const query = `UPDATE user SET name = ?, email = ?, phone = ? WHERE id = ?`;
    connection.query(query, [name, email, phone, req.params.id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

//hapus             
app.get('/delete/:id', (req, res) => {
    const query = `DELETE FROM user WHERE id = ?`;
    connection.query(query, [req.params.id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });