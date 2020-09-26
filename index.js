require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./src/database');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// distinguish api calls by using /api as prefix
app.use('/api', require('./routes/index'));

// Connect to MongoDB Database
const mongoUrl = process.env.MONGO_URL;
mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB successfully connected'))
	.catch((err) => console.log(err));

const port = process.env.APP_PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
