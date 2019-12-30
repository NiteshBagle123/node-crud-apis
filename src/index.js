const express = require('express');
require('./db/mongoose');

const userRoutes = require('./routers/users');
const taskRoutes = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes, taskRoutes);

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
