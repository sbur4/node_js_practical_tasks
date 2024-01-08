class SaveToFileError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SaveToFileError';
    }
}

module.exports = SaveToFileError;