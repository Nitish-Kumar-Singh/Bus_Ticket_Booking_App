const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Bus = require('../../models/Bus');

router.post(
  '/',
  [
    check('from', 'from is required').not().isEmpty(),
    check('to', 'to is required').not().isEmpty(),
    check('busType', 'busType is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { from, to, busType, fare, seat, arrdate } = req.body;

    try {
      bus = new Bus({
        from,
        to,
        busType,
        fare,
        seat,
        arrdate,
      });

      await bus.save();

      res.json(bus);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/search', async (req, res, next) => {
  let q = req.query.q;
  let [from, to] = q.split('-');
  try {
    const result = await Bus.find({
      from,
      to,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
