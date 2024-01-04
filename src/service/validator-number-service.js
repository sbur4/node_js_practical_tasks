class ValidatorNumberService {
    isMoreMaxValue(data) {
        return data > Number.MAX_VALUE;
    }

    isLessMinValue(data) {
        return data < Number.MIN_VALUE;
    }

    isInvalidValue(data) {
        return data == null || data === undefined || Number.isNaN(data);
    }
}

module.exports = ValidatorNumberService;