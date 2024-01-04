const randomNumberModel = require('../model/numbers-range');
const randomNumberService = require('../service/random-number-service');
const validNumberService = require('../service/validator-number-service');
const resultDto = require('../dto/result-dto');

const MODEL = new randomNumberModel(1, 100);
const SERVICE = new randomNumberService();
const VALIDATOR = new validNumberService();
const DTO = new resultDto(SERVICE.generateRandomNumber(MODEL, VALIDATOR));

function getRandomNumber() {
    return DTO.getResult();
}

module.exports = {
    getRandomNumber
};