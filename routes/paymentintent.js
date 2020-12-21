const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_cV85OXzfc8e87VWpOT9fgkXD');
const url = require('url');

router.get('/init', function(req, res, next) {
  res.render('paymentintent_init', { });
});

router.get('/get-client-secret', function(req, res, next) {
  stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
    payment_method_types: ["ideal"]
  }, function(err, paymentIntent) {
    if (err) {
      console.log("err=" + JSON.stringify(err));
      res.json({ error: err });
    } else {
      console.log("session=" + JSON.stringify(paymentIntent));
      res.json({ client_secret: paymentIntent.client_secret });
    }
  });

});

module.exports = router;
