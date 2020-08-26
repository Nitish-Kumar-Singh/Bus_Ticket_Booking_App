const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
// const gravator = require('gravator');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//Register user
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('phone', 'Phone Number is Invalid').isLength({ min: 10 }),
    check('dob', 'DOB is required').not().isEmpty(),
    check('gender', 'gender is required').not().isEmpty(),
    check('password', 'Password is not less than 6 char').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, dob, gender, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }

      user = new User({
        name,
        email,
        phone,
        dob,
        gender,
        password,
      });

      const salt = await bcrypt.genSalt(10); //recommended in document
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //for jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //constraints user exists or not exist
      //user gravator
      //encrypt password if
      //return jsonToken
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
