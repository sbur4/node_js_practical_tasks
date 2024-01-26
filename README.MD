# Practical task

In this task you will need to modify existing Express application by extending user model, adding authorization and authentication flows.

## Acceptance criteria

1. User entity is added - contains id ([uuid](https://www.npmjs.com/package/uuid)), email (unique), password, role (admin or simple user). 
Password is stored as hashed value in the database. [Bcrypt](https://www.npmjs.com/package/bcrypt) module is used for hashing passwords.
2. New API endpoint is added for user ***sign up*** by email and password e.g ``/register``. It creates user entity in the database.
3. New API endpoint is added for user ***sign in*** by email and password e.g ``/login``. It returns JWT token which contains 
user information. Pay attention that password is not encoded in token payload. JWT token expires in 2 hours.
4. JWT token is passed in ``Authorization`` header for each request (except sign in and sign up) in the following format ``Authorization: Bearer <token>``
5. Authentication middleware is added to check if token provided is valid and if user encoded in token exists. 
If no, ``401 Unauthorized`` status code is returned. Otherwise, user can do action they intended to do.

### Additional tasks:

1. Only admin users can delete user cart. Authorization middleware is added for this purpose.
If token provided doesn't belong to admin member, ``403 Forbidden`` status code is returned.

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