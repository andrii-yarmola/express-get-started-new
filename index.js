import express from 'express';
import bodyParser from 'body-parser';

// import users from './routes/users';

let app = express();

app.use(bodyParser.json());

// app.use('/api/users', users);

app.get('/', (req, res) => {
  res.send('Hell so1');
});


app.listen(3000, () => console.log('Running on localhost:3000'));
