const postModel = require('../models/post.model')
const generateCaption = require('../services/ai.service')

async function createPostController(req, res) {
    const file = req.file

    // Convert the image file to base64
    const base64ImageFile = Buffer.from(file.buffer).toString('base64')

    // Generate a caption using the AI service
    const Caption = await generateCaption(base64ImageFile)

    
    res.status(201).json({
        message: "Caption generated successfully",
        data: {
            caption: Caption
        }
    })
}

module.exports = createPostController;