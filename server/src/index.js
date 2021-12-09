const express = require("express");
const bodyParser = require("body-parser");
const Binding = require("../controllers/binding-controller");
const urlencodedParser = bodyParser.urlencoded({extended: true});

const app = express();
const port = 5000;

let header = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
};
app.use(header);

app.get('/', (req, res)=> {
    console.log('Get/ has done');
    res.send('Ekaterina made the first project with some page in the Vue!');
});

app.get("/binding", urlencodedParser, Binding.getBinding);

app.listen(port, function(){
    console.log(`Сервер включен на порту ${port}`);
});

