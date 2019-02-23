module.exports = {
    env: process.env.NODE_ENV || 'dev',
    prod: {
        port: 80,
    },
    dev: {
        port: 3001,
    }
};
