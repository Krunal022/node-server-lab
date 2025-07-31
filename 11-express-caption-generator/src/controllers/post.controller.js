const postModel = require('../models/post.model')

async function createPostController(req, res) {
    const file = req.file
    res.send("hey")
}

module.exports = createPostController;