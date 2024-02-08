const {google} = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URL
);

exports.getAuthorizationUrl = (scopes) => {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    });
};

exports.getToken = async (code) => {
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

exports.getUserInfo = async (tokens) => {
    const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });
    const {data} = await oauth2.userinfo.get();
    return data;
};
