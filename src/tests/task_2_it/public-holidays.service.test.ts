import {
    getListOfPublicHolidays,
    checkIfTodayIsPublicHoliday,
    getNextPublicHolidays,
} from '../../services/public-holidays.service'
import { mockedCountry, mockedYear } from '../mocks'

afterAll(() => {
    jest.clearAllMocks()
})

it('should return false if today is public holidays', async () => {
    const isTodayHoliday = await checkIfTodayIsPublicHoliday(mockedCountry)
    expect(isTodayHoliday).toBeFalsy()
})

it('should get list of next public holidays', async () => {
    const response = await getNextPublicHolidays(mockedCountry)
    expect(response.length).toBeGreaterThanOrEqual(0)
})

it('should get list of public holidays', async () => {
    const response = await getListOfPublicHolidays(mockedYear, mockedCountry)
    expect(response.length).toBeGreaterThanOrEqual(0)
})