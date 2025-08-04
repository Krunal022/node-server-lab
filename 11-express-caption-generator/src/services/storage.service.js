const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT
});


async function uploadFile(File, filename) {
    
    const response = await imagekit.upload({
        file: File, // required
        fileName: filename, // required
        folder: "ai-caption-images", // optional
    });
    
    return response;

}

module.exports = uploadFile;
