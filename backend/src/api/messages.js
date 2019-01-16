const express = require('express');

const Joi = require('joi');

const router = express.Router();

const schema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(1)
    .max(100)
    .required(),
  message: Joi.string()
    .alphanum()
    .min(1)
    .max(500)
    .required(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  data: Joi.date()
});

router.get('/', (req, res) => {
  res.json(['blah']);
});

router.post('/messages', (req, res) => {
  res.json(['blah']);
});

module.exports = router;
