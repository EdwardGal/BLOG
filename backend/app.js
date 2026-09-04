// require('dotenv').config();
// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const routes = require('./routes');
// const dns = require('dns');

// dns.setServers(['1.1.1.1']);

// const port = 3001;
// const app = express();

// app.use(cookieParser());
// app.use(express.json());

// app.use('/api', routes);

// app.get('*any', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
// });

// mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
//   app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
//   });
// });

require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const port = 3001;
const app = express();

app.use(express.static(path.resolve('..', 'frontend', 'dist')));

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

app.get('*any', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
