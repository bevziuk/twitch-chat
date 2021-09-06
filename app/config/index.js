module.exports = {
    app: {
        name: 'Twitch-chat'
    },
    server: {
        port: process.env.NODE_APP_INSTANCE || 3000
    },
    locals: {
        callbackURL: '/auth/twitch/callback/'
    }
};
