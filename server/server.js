const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db');

app.get('/api/host', (req, res) => {
    res.send({ host : 'sungjin' });
})

app.get('/api/test', (req, res) => {
    db.query("select * from user_test", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

