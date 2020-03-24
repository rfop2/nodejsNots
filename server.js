var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(session({
    secret: 'secret123',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.get('/' , function(req,res){
    res.send("connect-flash example");
});

app.get('/login', function(req,res){
    res.render("welcome");
});

app.get('/entrar', function(req,res){
    req.flash('msg1', 'Dados escritos de forma errada');
    res.render("welcome");
});

app.post('/login', function(req,res){
   const {usuario,senha} = req.body;
   let erros = [];

    // ve se ta vazio
    if(!usuario || !senha){
        erros.push({msg: 'Preencha todos os campos'});
    }

    //tamanho da seha
    if(senha.length < 6){
        erros.push({msg: 'A senha tem tamanho minimo de 6 caracteres'});
    }
    if(erros.length > 0 ){
        res.render('entrar',{
            erros,
            usuario,
            senha
        });
    } else{
        res.send('pass');
    }
});


app.get('/home', function(req,res){
    req.flash('msg1', 'Sweden is a nice place');
    res.send("hello user");
    //res.redirect('/home2');
});

app.get('/home2', function(req,res){
    res.send(req.flash('msg1'));
});

app.listen(3000, function(){
    console.log("server is running..");
});

