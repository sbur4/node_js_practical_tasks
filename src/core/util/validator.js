class ValidatorUtil {
    static validateString(data) {
        return typeof data !== 'string' || data.trim() === '' || data === null;
    }

    static validateInt(data) {
        return data <= 0 || typeof data !== 'number' || !Number.isInteger(data);
    }
}

module.exports = ValidatorUtil;