const authModel = require('../model/googleModel');

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];

const authorizationUrl = authModel.getAuthorizationUrl(scopes);

exports.login = (req, res) => {
    res.redirect(authorizationUrl);
};

exports.googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        const tokens = await authModel.getToken(code);
        const userInfo = await authModel.getUserInfo(tokens);
        res.send(userInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
