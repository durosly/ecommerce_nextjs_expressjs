
module.exports = class CustomError extends Error {
    constructor(message) {
        super(message)
        this.name = "SafePlazeError"
        Error.captureStackTrace(this, CustomError)
    }
}