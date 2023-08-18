const express = require('express')
const app = express();
const {userRouter} = require('./AllRoutes/userRoutes')
const {notesRouter} = require('./AllRoutes/notesRouter')
const {connection} = require('./db')
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use('/user', userRouter)
app.use('/note', notesRouter)

app.get('/', async(req, res)=>{
    try {
        res.status(200).send({"msg": "Displaying Notes"})
    } catch (error) {
        res.status(400).send({"msg": error})
    }
})


app.listen(7000, async(req, res)=>{

    try {
        await connection;
        console.log("Connected to DB");
        console.log("Express erevr is running at port 7000");
    } catch (error) {
        console.log(error);
        
    }
})