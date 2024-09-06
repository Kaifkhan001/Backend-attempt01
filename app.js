import express from 'express';
const app = express();






app.get('/',(req, res) => {
    res.send("Ha sab sahi chal raha bro");
});




app.get('/register', (req, res) => {
    res.render()
  });

app.get('/profile', (req, res) => {
    res.send("Ye raha profile page");
});

export default app;


