// const path = require('path');
// const router = jsonServer.router(path.join(__dirname, 'db.json'))
// console.log(path.join(__dirname, 'db.json'));
const jsonServer = require('json-server');

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const AUTH0_DOMAIN = 'alexicum.eu.auth0.com';
const port = process.env.PORT || 3000;
const API_URI = `http://localhost:${port}`;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: API_URI,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

const server = jsonServer.create();
const router = jsonServer.router('products.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jwtCheck);

// server.use((req, res, next) => {
//   next();
//  // if (isAuthorized(req)) { // add your authorization logic here
//  //   next() // continue to JSON Server router
//  // } else {
//  //   res.sendStatus(401)
//  // }
// });

server.use(router);
server.listen(port, () => {
  console.log('JSON Server with fake Products API is running');
});
