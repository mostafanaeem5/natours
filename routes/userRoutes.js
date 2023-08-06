const express = require('express');
const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: { users },
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route has not yet been defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route has not yet been defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route has not yet been defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: ' This route has not yet been defined',
  });
};

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
