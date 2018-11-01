const mongoose = require('mongoose')
const api = require('./api')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const MONGO_URL = 'mongodb://playpbnow-dev:playn0w123@ds133252.mlab.com:33252/playpbnow-development'
const PORT = 3000

app.prepare()
  .then(() => {
    const server = express();

    mongoose.connect(MONGO_URL,  { useNewUrlParser: true })

    server.use("/api", api);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
