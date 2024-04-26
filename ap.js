const express = require("express");
  
const app = express();
app.get("/", function(_, response){
      
    response.send("<h1>Главная страница</h1>");
});
app.use("/static", function(request, response){
      
    response.send(`<h1>Hello</h1><p>Octagon NodeJS Test</p>`);

});
app.get('/dynamic', (request, response) => {
    const variables = ['a', 'b', 'c'];
    let isValid = true;

    for (let variable of variables) {
        if (!(variable in request.query && !isNaN(parseFloat(request.query[variable])))) {
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        response.send("<h1>Error</h1>");
    } else {
        const result = (parseFloat(request.query.a) * parseFloat(request.query.b) * parseFloat(request.query.c)) / 3;
        response.send(`<h1><strong>Calculated</strong></h1> <p>${result}</p>`);
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
