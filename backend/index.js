const express= require('express')
const app = express();
require ('dotenv').config();
require('./Models/db')
app.use(express.json()); 
const bodyParser = require('body-parser');
const cors= require('cors') //allow req from any portno
app.use(cors())
const TaskRouter= require('./Routes/TaskRouter')
app.use(bodyParser.json()); //when you have to take json body from clent side
app.get('/', (req,res)=>{
    res.send("hello")
})  

app.use('/tasks',TaskRouter);
const PORT= process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT= ${PORT}`)
})