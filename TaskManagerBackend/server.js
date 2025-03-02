const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  "extended": false
}));
const controller = require("./controller/controller");
app.use(controller);

app.listen(port, ()=>{
  console.log(`Server is running on port: ${port}`);
});

