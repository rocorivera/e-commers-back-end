const { getAll, create } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const { remove } = require('../controllers/user.controllers');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(getAll)
    .post(upload.single('image'),create)

imageRouter.route('/:id')
    .delete(remove)

module.exports = imageRouter;