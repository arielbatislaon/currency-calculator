const express = require('express');
const cors = require('cors');
const app = express();
const port = 8081;
const currencyCalculator =require('./currency-calculator');

app.use(cors({
   origin: 'http://localhost:3000'
}));

app.get('/calculate-currency', function (req, res) {
   
   const   fromCurrency = req.query.fromCurrency;
   const   toCurrency = req.query.toCurrency;
   const   amount = Number(req.query.amount);
   const response = currencyCalculator.convertAmount(amount, fromCurrency, toCurrency);

   console.log(response);
   res.send(response);
})

const server = app.listen(port, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Currency Calculator API listening at http://%s:%s", host, port)
})