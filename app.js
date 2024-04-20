const express = require("express");
const app = express();
app.get("/", function(request, response){
     
    
    response.send("<h1>Привет, Октогон!</h1>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);