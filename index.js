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
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// distinguish api calls by using /api as prefix
app.use('/api', require('./routes/index'));

app.use('/*', (req, res) =>
	res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
);

// Connect to MongoDB Database
const mongoUrl = process.env.MONGO_ATLAS || 'mongodb://localhost:27017/engage';
mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB successfully connected'))
	.catch((err) => console.log(err));

const port = process.env.PORT || 5000;
const host = '0.0.0.0';
app.listen(port, host, () =>
	console.log(`Server up and running on port ${port} !`)
);
