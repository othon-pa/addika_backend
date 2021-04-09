const express = require('express');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();
const env = process.env;
const port = env.PORT || '3000';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Send all the queries to the router file */
app.use('/', routes);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});