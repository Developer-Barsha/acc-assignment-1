const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/user.route.js');

// middlewares
app.use(cors());
app.use(express.json());
// app.use('/user', userRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res)=>{
    res.send('hello world!');
});

app.all('*', (req, res)=>{
    res.send('ROUTE NOT FOUND!')
})

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});