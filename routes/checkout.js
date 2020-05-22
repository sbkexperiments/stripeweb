const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_cV85OXzfc8e87VWpOT9fgkXD');
const url = require('url');

router.get('/init', function(req, res, next) {
  res.render('checkout_init', { });
});

router.get('/success', function(req, res, next) {
  const queryObject = url.parse(req.url,true).query;
  res.render('checkout_success', queryObject);
});

router.get('/cancel', function(req, res, next) {
  res.render('checkout_cancel', { });
});

router.post('/create-session', function(req, res, next) {
  stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'Awesome Photo',
      description: 'Awesome Photo',
      images: ['https://picsum.photos/280/320'],
      amount: 500,
      currency: 'USD',
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/checkout/cancel',
  },
  function(err, session) {
    if (err) {
      console.log("err=" + JSON.stringify(err));
      res.send(JSON.stringify(err));
    } else {
      console.log("session=" + JSON.stringify(session));
      res.send(JSON.stringify(session));
    }
  });

});

module.exports = router;
