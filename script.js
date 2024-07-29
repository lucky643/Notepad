const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
     fs.readdir(`./files`, (err, data) => {
          res.render('home', {data: data});
     })
})

app.get('/files/:file', (req, res) => {
     fs.readFile(`./files/${req.params.file}`,"utf-8", (err, data)=>{
          res.render('show',{title: req.params.file, data: data});
     })
})

app.get('/:file', (req, res) => {
     fs.unlink(`./files/${req.params.file}`, (err)=>{
          res.redirect('/');
     })
})

app.post('/Created', (req, res) => {
     fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, req.body.data, (err, data) => {
          res.redirect('/');
     })
})


app.listen(3000, () => {
     console.log("notepad server is running on port 3000")
})