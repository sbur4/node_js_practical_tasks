import axios from 'axios'
import {PublicHolidayShort} from '../../types'
import {PUBLIC_HOLIDAYS_API_URL} from '../../config'
import {
    checkIfTodayIsPublicHoliday,
    getListOfPublicHolidays,
    getNextPublicHolidays
} from '../../services/public-holidays.service'
import {mockedCountry, mockedPublicHolidays, mockedYear} from '../mocks'
import {validateInput} from "../../helpers";

afterAll(() => {
    jest.clearAllMocks()
})

describe('#getListOfPublicHolidays', () => {
    // positive tests
    it('should return correct url', async () => {
        const axiosSpy = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(mockedPublicHolidays))

        getListOfPublicHolidays(mockedYear, mockedCountry).then((data) => {
            expect(axiosSpy).toHaveBeenCalledWith(
                `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${mockedYear}/${mockedCountry}`)
        })
    })

    it('should return holidays array', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve(mockedPublicHolidays)
        )

        getListOfPublicHolidays(mockedYear, mockedCountry).then((data) => {
            expect(data).toEqual(expect.any(Array<PublicHolidayShort>))
        })
    })

    it('should return empty array if got error', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        getListOfPublicHolidays(mockedYear, mockedCountry).then((data) => {
            expect(data.length).toBe(0)
        })
    })

    // negative tests
    it('should return an exception if set invalid country', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        getListOfPublicHolidays(mockedYear, 'UA').catch((error) => {
            expect(error.message).toBe("Country provided is not supported, received: UA");
        });
    })

    it('should return an exception if set country as null', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        getListOfPublicHolidays(mockedYear, String.apply(null)).catch((error) => {
            expect(error.message).toBe("Country provided is not supported, received: null");
        });
    })

    it('should return an exception if set country as empty', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        getListOfPublicHolidays(mockedYear, String.apply("")).catch((error) => {
            expect(error.message).toBe("Country provided is not supported, received: \"\"");
        });
    })

    it('should return an exception if set invalid year', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        getListOfPublicHolidays(-1988, mockedCountry).catch((error) => {
            expect(error.message).toBe("Year provided not the current, received: -1988");
        });
    })

    it('should return an exception if set invalid year', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        getListOfPublicHolidays(Number.apply(null), mockedCountry).catch((error) => {
            expect(error.message).toBe("Year provided not the current, received: null");
        });
    })
})

describe('#checkIfTodayIsPublicHoliday', () => {
    it('should return correct url', async () => {
        const axiosSpy = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(mockedPublicHolidays))

        checkIfTodayIsPublicHoliday(mockedCountry).then((data) => {
            expect(axiosSpy).toHaveBeenCalledWith(
                `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${mockedCountry}`)
        })
    })

    it('should return true if status 200', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve({status: 200})
        )

        checkIfTodayIsPublicHoliday(mockedCountry).then((data) => {
            expect(data).toBeTruthy()
        })
    })

    it('should return false if status not 200', () => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve({status: 403})
        )

        checkIfTodayIsPublicHoliday(mockedCountry).then((data) => {
            expect(data).toBeFalsy()
        })
    })

    it('should return false if get error', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        checkIfTodayIsPublicHoliday(mockedCountry).then((data) => {
            expect(data).toBeFalsy()
        })
    })
})

describe('#getNextPublicHolidays', () => {
    it('should use correct url', async () => {
        const axiosSpy = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(mockedPublicHolidays))
        getNextPublicHolidays(mockedCountry).then((data) => {

            expect(axiosSpy).toHaveBeenCalledWith(
                `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${mockedCountry}`)
        })
    })

    it('should return PublicHolidayShort array', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() =>
            Promise.resolve(mockedPublicHolidays)
        )

        getNextPublicHolidays(mockedCountry).then((data) => {
            expect(data).toEqual(expect.any(Array<PublicHolidayShort>))
        })
    })

    it('should return empty array if get error', () => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            throw Error()
        })

        getNextPublicHolidays(mockedCountry).then((data) => {
            expect(data.length).toBe(0)
        })
    })
})