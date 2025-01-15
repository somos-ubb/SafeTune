docker_compose_cmd=docker compose
ifeq ($(command -v docker-compose &> /dev/null), 1)
	$(info WARNING: using old docker compose, will be deprecated in June 2023)
	docker_compose_cmd=docker-compose
endif

setup-start:
	${docker_compose_cmd} run --rm backend bash -c "npx knex migrate:latest; python3 ./app/utility/model/downloader.py"

redo-migrations:
	${docker_compose_cmd} run --rm backend bash -c "npx knex migrate:rollback --all; npx knex migrate:latest;"

build:
	${docker_compose_cmd} build

up:
	${docker_compose_cmd} up -d

build-up:
	${docker_compose_cmd} up --build -d

up-dev:
	${docker_compose_cmd} up

build-up-dev:
	${docker_compose_cmd} up --build

down:
	${docker_compose_cmd} down