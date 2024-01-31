const express = require('express');
require('dotenv').config();
const router = require('./routers/index.route');
const db = require('./config/mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(router);
db.connectToDatabase().then(function () {
    console.log('DB connect successfully!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
