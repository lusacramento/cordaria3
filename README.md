# Cordaria
This application was developed with Nuxt 3. Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup
This app requires [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) to run.

## Environment Variables
```bash
# Create .env file from .env-exemple
cp .env.example .env
```
Put your data config variables like as host names and ports to will used it.

## Development Server
Build the application for development:
```bash
# run docker compose
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
Start the development server on `http://localhost:8000`:

## Production
Build the application for production:
```bash
# run docker compose
docker compose -f docker-compose.yml --build
```
Start the production server on `http://localhost:3000`:

## Contributing