# Gender-Based Violence Thesis

This is the thesis on gender-based violence, including both the backend and frontend.

## What’s missing

`.env` files + the trained ML model. Please request these from the developer.

## How to run

1. Make sure you have Docker Engine, Docker Desktop, or a similar tool installed.  
2. (Optional) Install **Make**.

Then, run the following commands:

```bash
docker compose up --build
docker compose run --rm backend bash -c "npx knex migrate:latest; python3 ./app/utility/model/downloader.py"
```

Or, if you have **Make** installed:

```bash
make build-up
make setup-start
```

This will migrate the tables to the database, and the app should be ready to use.

## Addresses

- Frontend: `http://localhost:3000`
- PhpMyAdmin: `http://localhost:8080`
