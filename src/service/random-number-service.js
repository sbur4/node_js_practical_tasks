class RandomNumberService {
    generateRandomNumber(model, validator) {
        if (this.validate(validator, model.start)) {
            return 0;
        } else if (this.validate(validator, model.end)) {
            return 0;
        } else {
            return Math.floor(Math.random() * (model.end - model.start + 1)) + model.start;
        }
    }

    validate(validator, data) {
        return validator.isMoreMaxValue(data) || validator.isLessMinValue(data)
            || validator.isInvalidValue(data);
    }
}

module
    .exports = RandomNumberService;