import { PublicHoliday } from "../types"

export const mockedYear = 2024
export const mockedCountry = 'GB'
export const mockedPublicHolidays: PublicHoliday[] = [
    {
        date: '2024-01-01',
        localName: 'Hogmanay',
        name: 'New Year',
        countryCode: mockedCountry,
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['Public'],
    },
    {
        date: '2024-12-25',
        localName: 'Boxing Day',
        name: "Christmas",
        countryCode: mockedCountry,
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ['Public'],
    },
]