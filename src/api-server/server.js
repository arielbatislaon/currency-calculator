const express = require('express');
const app = express();
const port = 8081;
const currencyCalculator =require('./currency-calculator');

app.get('/calculate-currency', function (req, res) {
   
   const   fromCurrency = req.query.fromCurrency;
   const   toCurrency = req.query.toCurrency;
   const   amount = req.query.amount;
   const response = currencyCalculator.convertAmount(amount, fromCurrency, toCurrency);

   console.log(response);
   res.end(JSON.stringify(response));
})

const server = app.listen(port, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("Currency Calculator API listening at http://%s:%s", host, port)
})