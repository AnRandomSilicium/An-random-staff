const express = require("express");
  
const app = express();
app.get("/", function(_, response){
      
    response.send("<h1>Главная страница</h1>");
});
app.use("/static", function(request, response){
      
    response.send(`<h1>Hello</h1><p>Octagon NodeJS Test</p>`);

});
app.use("/dynamic", function(request, response){

    const a = 1;
    const b= 2;
    const c= 3; 
    const d= (a+b+c)/3;
    response.send(`<h1>Calculated</h1><p> ${d} </p>`);
});


app.listen(3000);