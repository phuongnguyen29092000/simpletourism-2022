require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/', (req, res) => {
    res.send("Hello")
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));