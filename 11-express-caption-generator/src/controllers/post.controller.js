const postModel = require('../models/post.model')
const generateCaption = require('../services/ai.service')
const uploadFile = require('../services/storage.service')
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
    const file = req.file

    // Convert the image file to base64
    const base64ImageFile = Buffer.from(file.buffer).toString('base64')

    // Generate a caption using the AI service

    // const caption = await generateCaption(base64ImageFile)
    // const fileUploadResponse = await uploadFile(file.buffer, `${uuidv4()}`)
    
     const [ caption, fileUploadResponse ] = await Promise.all([
        generateCaption(base64ImageFile),
        uploadFile(file.buffer, `${uuidv4()}`)
    ]);

    const post = await postModel.create({
        caption: caption,
        image: fileUploadResponse.url,
        user: req.user._id
    })

    res.status(201).json({
        message: "Post Created successfully🪄!",
        data: {
            post
        }
    })
}

module.exports = createPostController;