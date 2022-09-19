const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

app.all('*', (req, res)=>{
    res.send('ROUTE NOT FOUND!')
})

app.get('/', (req, res)=>{
    res.send('hello world!');
});

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});