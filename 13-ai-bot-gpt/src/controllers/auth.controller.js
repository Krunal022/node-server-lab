async function getRegisterController(req, res) {
    res.render('register')
}


async function postRegisterController(req, res) {
    console.log(req.body);
    const user = req.body;
    res.json({
        message: "user resiger!",
        user
    })
}

async function getLoginController(req, res) {
    res.render('login')
}


module.exports = {
    postRegisterController,
    getRegisterController,
    getLoginController
}