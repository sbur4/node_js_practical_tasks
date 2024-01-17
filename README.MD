# Practical task

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon). We are going to implement functionality for managing carts, creating orders and products.

## The application has 4 primary entities:

- ``User`` - can add some products to the cart and then order them (***example***).
- ``Product`` - represents product information that user can order (***example***).
- ``Cart`` - contains a list of products and their amount that user wants to order (***example***).
- ``Order`` - contains list of products from cart that user has ordered (***example***).

### Relations between entities:

- Each ``User`` can have only one non-deleted ``Cart`` at a time. Each ``Cart`` is attached to a specific ``User``.
- One ``User`` can have multiple Orders. Each ``Order`` is attached to a specific ``User``.
- ``Cart`` contains a list of products that user wants to order **with the amount** of those products specified.

## Acceptance criteria:

### Note: TypeScript should be used.

1. Data is stored in PostgreSQL database. **Docker image** is used for local development (check **Node.js and database 
interactions section** for an example of docker-compose file).
2. ORM is used to query data (e.g **TypeORM, Sequelize, Mikro-ORM**).
3. Migrations are used to create and delete tables (**TypeORM, Sequelize, Mikro-ORM**).

### Additional (optional) tasks:

1. Seeds are used to populate database with test data, e.g products, orders (**TypeORM, Sequelize, Mikro-ORM**)
2. If you are using **Mikro-ORM**, type-safe relations and collections are used.

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