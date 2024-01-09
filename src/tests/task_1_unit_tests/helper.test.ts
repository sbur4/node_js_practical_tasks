import { shortenPublicHoliday, validateInput } from '../../helpers'
import { mockedCountry, mockedPublicHolidays, mockedYear } from '../mocks'

describe('Testing Helper Methods', () => {
    it('[validateInput method] should return true if the parameters are valid', async () => {
        expect(
            validateInput({ country: mockedCountry, year: mockedYear })
        ).toBeTruthy()
    })

    it('[validateInput method] should throw an error if the country contains an invalid value', () => {
        const country = 'invalid1234'
        expect(() => validateInput({ country, year: mockedYear })).toThrowError(
            new Error(`Country provided is not supported, received: ${country}`)
        )
    })
    it('[validateInput method] should throw an error if the year contains an invalid value', () => {
        const year = 1234

        expect(() =>
            validateInput({ country: mockedCountry, year })
        ).toThrowError(
            new Error(`Year provided not the current, received: ${year}`)
        )
    })

    it('[shortenPublicHoliday method] should return a formatted object', async () => {
        const holiday = mockedPublicHolidays[0]
        const formatHolidayObject = {
            name: holiday.name,
            localName: holiday.localName,
            date: holiday.date,
        }
        expect(shortenPublicHoliday(holiday)).toEqual(formatHolidayObject)
    })
})