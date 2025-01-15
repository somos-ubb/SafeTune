# Violencia de Género Tesis

Esta es la tesis de Violencia de Género, tanto backend como frontend

## Que falta

Archivos .env + modelo entrenado ML, pedir a desarrollador

## Cómo ejecutar

Primero tener instalado Docker Engine, Docker Desktop o similares

Make (opcional)

Luego ejecutar los siguientes comandos:

```bash
docker compose up --build
docker compose run --rm backend bash -c "npx knex migrate:latest; python3 ./app/utility/model/downloader.py"
```
o si tienes Make instalado

```bash
make build-up
make setup-start
```

Y con esto se migrarán las tablas a la base de datos y la app debería estar lista para usarse.

## Direcciones

Frontend: localhost:3000

PhpMyAdmin: localhost:8080