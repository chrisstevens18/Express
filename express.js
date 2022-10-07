const cors = require('cors')
const express = require('express');
const app = express();
const PORT = 8000;
const {Client} = require('pg');
const bodyP = require('body-parser');

app.use(cors())
app.use(bodyP());
const client = new Client({
    connectionString:"postgres://memo_zqhk_user:VSN8JYivzLUf2izDvX8W9zajgcpkegn7@dpg-cd089oda4994l0df7b6g-a.oregon-postgres.render.com/memo_zqhk?ssl=true"
});
client.connect();
app.use(express.static('public'))
app.get('/api/memo', (req, res) => {
    client.query('SELECT * FROM memo_table').then((result) => {
       res.setHeader('Content-Type', 'application/json');
       res.send(result.rows);
    })
})

app.post('/api/memo', (req, res) => {
    let newComment = req.body
    console.log(newComment);
    client.query("INSERT INTO memo_table(description) VALUES ($1);",[newComment.description]).then((data)=>{
        res.send(newComment)

    });
});

app.delete('/api/memo',(req, res)=>{
    let id = req.body.id; 
    client.query('DELETE FROM memo_table WHERE memo_id = $1',[id]).then((data) =>{

        res.send()
    })
});

app.listen(PORT, () =>{
    console.log('Listening on port: ', PORT);
});
    