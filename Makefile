BUILD_NAME=gymkhana-sac
BUILD_TAG=$$(git log -1 --pretty=%h)

build:
	@docker build -t ${BUILD_NAME}-backend:${BUILD_TAG} -t ${BUILD_NAME}-backend:latest -f backend/Dockerfile backend

.env:
	@cp .env.example .env

launch: .env
	@docker-compose up

launch-bg: .env
	@docker-compose up -d

stop:
	@docker-compose down

logs:
	@docker-compose logs -f

ex-sac_django:
	@docker exec -it $$(echo "$$(docker ps --filter "name=sac_django")" | awk 'NR > 1 {print $$1}') sh

ex-dbpostgresql:
	@docker exec -it $$(echo "$$(docker ps --filter "name=dbpostgresql")" | awk 'NR > 1 {print $$1}') sh
