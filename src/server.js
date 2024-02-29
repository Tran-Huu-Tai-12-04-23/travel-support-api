const express = require('express');
require('dotenv').config();
const router = require('./routers/index.route');
const db = require('./config/mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./config/swaggerConf');
var passport = require('passport');
require('./passport');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'doc.html'));
});

app.use('/api', router);

db.connectToDatabase().then(function () {
    console.log('DB connect successfully!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
