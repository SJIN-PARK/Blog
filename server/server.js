const express = require('express');
const app = express();

//const db = require('./config/db'); // changed db connection way
const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());

app.get('/api/host', (req, res) => {
    res.send({ host : 'sungjin' });
})

/*
app.get('/api/test', (req, res) => {
    db.query("select * from user_test", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
}*/

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

