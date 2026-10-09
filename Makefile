.PHONY: install build lint fix test mutation check dev

node_modules/.install: package-lock.json
	npm ci
	@touch node_modules/.install

install: node_modules/.install

build: install
	npm run build

lint: install
	npm run lint

fix: install
	npm run lint:fix

test: install
	npm test

mutation: install
	npx typescript mutation

check: lint test mutation

dev: install
	npm run dev
