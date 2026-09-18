.PHONY: install build lint test fix check dev
node_modules/.install: package-lock.json
	npm ci
	@touch node_modules/.install
install: node_modules/.install
build: install
	npm run build
lint: install
	npm run lint
test: install
	npm test
fix: install
	npm run lint:fix
check: install
	npm run check
dev: install
	npm run dev
