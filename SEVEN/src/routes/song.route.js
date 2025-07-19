const express = require('express');
const router = express.Router();

// Importing multer for file uploads
// We use multer to handle multipart/form-data which is used for uploading files
const multer = require('multer');

// Middleware to parse JSON bodies
express.json();

// upload configuration for multer
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
    res.send('Song route is working!');
});

router.post('/', upload.single('audio'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.status(201).send('Song created successfully!');
});

module.exports = router;