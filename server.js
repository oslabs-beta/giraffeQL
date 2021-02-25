const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {

    const server = express();

    server.use((req, res, next) => {
      const hostname = req.hostname === 'www.giraffeql.io' ? 'giraffeql.io' : req.hostname;

      if (req.headers['x-forwarded-proto'] === 'http' || req.hostname === 'www.giraffeql.io') {
        res.redirect(301, `https://${hostname}${req.url}`);
        return;
      }

      res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains; preload');
      next();
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(
      4242,
      error => {
        if (error) throw error;
        console.error('Listening on port 4242');
      }
    );

  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });