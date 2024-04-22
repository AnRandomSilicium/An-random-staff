const express = require("express");
  
const app = express();
app.get("/", function(_, response){
      
    response.send("<h1>Главная страница</h1>");
});
app.use("/static", function(request, response){
      
    response.send(`<h1>Hello</h1><p>Octagon NodeJS Test</p>`);

});
app.get('/dynamic', (request, response) => {
    const a = parseFloat(request.query.a);
    const b = parseFloat(request.query.b);
    const c = parseFloat(request.query.c);

    if (isNaN(a),  isNaN(b),  isNaN(c)) {
        response.send("<h1>Error</h1>");
    } else {
        const d = (a * b * c) / 3;
        response.send(`<h1><strong>  Calculated </strong></h1> ${d}`)
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
