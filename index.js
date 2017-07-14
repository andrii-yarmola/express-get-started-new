import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import _ from 'lodash';

let users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
  if (err) throw err;

  JSON.parse(data).forEach(
    (user) => {
      user.name = _.startCase(user.name);
      users.push(user);
    }
  )
})

let app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify(users, null, 2));
});

app.listen(3000, () => console.log('Running on localhost:3000'));
