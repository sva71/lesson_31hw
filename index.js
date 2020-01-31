const express = require('express');
const app = express();
const $data = require('./route/data');

app
    .route('/')
    .get($data.universalMethod);

app
    .route('/users/:requestParam')
    .get($data.getActionUser)
    .get($data.getUser);

app
    .route('/users')
    .get($data.getAllUsers);

app.listen(3000, function () {
    console.log('Mock server now is listening on port 3000!');
});

module.exports = { app };
