import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import _ from 'lodash';
import engines from 'consolidate';
import path from 'path';

let users = [];

const getUser = ( username ) => {
  let newUser;
  JSON.parse(fs.readFileSync('users.json', {encoding: 'utf8'})).forEach(
    (user) => {
      if ( username.toLowerCase() == user.name.toLowerCase() ) {
        newUser = user;
      };
    }
  )
  return newUser;
}

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

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/profilepics', express.static('images'));

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { users });
});

app.get('/user/:username', (req, res) => {
  const username = req.params.username;
  const user = getUser(username);
  res.render('user', { username, age: user.age })
});

app.put('/user/:username', (req, res) => {
  const username = req.params.username;
  const user = getUser(username);
  // save
  res.end();
});


const server = app.listen(3000, () => console.log('Running on localhost:' + server.address().port ));
