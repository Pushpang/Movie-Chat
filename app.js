const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');


const app = express();

// Handlebars

// const expressHbs = require('express-handlebars');

// app.engine('hbs',expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout.hbs'}));
// app.set('view-engine','hbs');
// app.set('views','views')

// EJS
app.set('view-engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'static','index.html'));
});

app.post('/home',(req,res,next)=>{
    name = req.body.name;
    res.render('home.ejs',{name : name});
});

app.post('/search',(req,res,next)=>{
    var search = req.body.search;
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=1bfdbefd&s='+ search)
        .then((res)=>{
            var list =  res.data.Search;
            console.log(list);
            call(list);
        })
        .catch((err)=>{
            console.log(err);
        });
    function call(list)
    {       
        res.render('search.ejs',{movies: list});
    }   
});

app.use('/details',(req,res,next)=>{
    var id = req.body.id;
    axios.get('http://www.omdbapi.com/?apikey=1bfdbefd&i='+ id)
        .then((res)=>{
            var data =  res.data;
            console.log(data);
            call(data);
        })
        .catch((err)=>{
            console.log(err);
        });
    function call(data)
    {       
        res.render('details.ejs',{details: data});
    }   
});

app.listen(3000);

