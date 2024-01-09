import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";
import { mockedCountry } from "../mocks";

describe("Country API", () => {
    describe("/CountryInfo", () => {
        it("should return 200 and country info", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
                `/CountryInfo/${mockedCountry}`
            );

            expect(status).toEqual(200);
            expect(body).toEqual({
                commonName: expect.any(String),
                officialName: expect.any(String),
                countryCode: expect.any(String),
                region: expect.any(String),
                borders: expect.any(Array || null),
            });
        });
    });
    describe("/AvailableCountries", () => {
        it("should return 200 and list available countries", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
                `/AvailableCountries`
            );

            expect(status).toEqual(200);
            body.forEach((breed: any) => {
                expect(breed).toEqual({
                    countryCode: expect.any(String),
                    name: expect.any(String),
                });
            });
        });
    });
});

describe("Version API", () => {
    describe("/Version", () => {
        it("should return 200 and version info", async () => {
            const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
                `/Version`
            );

            expect(status).toEqual(200);
            expect(body).toEqual({
                name: expect.any(String),
                version: expect.any(String),
            });
        });
    });
});