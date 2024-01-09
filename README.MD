# Practical task

## Prerequisites

You are working for a delivery company that has offices in Great Britain, Germany, France and the Netherlands. You are a part of backend team that focuses on building internal tools for that company. One day you received a new request from a customer to create a public holidays module. This module will:

- show a list of public holidays for specific country for the current year
- show the next public holiday for specific country
- show if today is public holiday in your location

After some time of investigation, you found ``Nager.Date API`` that meets the requirements above. Your customer agreed to use it, so now you can start the development.

Once you’ve finished writing code, you have to cover your module with tests.

## Source code

You can find the implementation ``here``.

## Task 1

Write unit tests for ``public-holidays.service.ts`` and ``helpers.ts`` files. Keep in mind that any external calls are mocked in unit tests.

## Task 2

Write integration tests for ``public-holidays.service.ts``. Do not forget that in this case you make real calls to the API.

## Task 3

Get code coverage with tests for your application. Strive to have no less than 90% of code coverage.

## Task 4

Select any 2 endpoints from ``Nager.Date API`` and write e2e tests for them.

## Evaluation criteria

### 5-point scoring system

- `3` - Acceptance criteria 1-2 are implemented.
- `4` - Acceptance criteria 1-3 are implemented.
- `5` - Acceptance criteria 1-4 are implemented.

### 100-point scoring system

- `60 - 69` - Acceptance criteria 1-2 are partially implemented.
- `70 - 79` - Acceptance criteria 1-2 are implemented.
- `80 - 89` - Acceptance criteria 1-3 are implemented.
- `90 - 100` - Acceptance criteria 1-4 are implemented.