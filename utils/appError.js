class AppError extends Error {
    constructor(status, message) {
        const msg = Array.isArray(message) ? message.join(' && ') : message; 

        super(message);
        this.status = status;
    }
};

module.exports = AppError;