PATH := $(PWD)/node_modules/.bin:$(PATH)

# Version of the latest git tag
VERSION = $(shell node -e "console.log(require('./lerna.json').version)")

# BEGIN-EVAL makefile-parser --make-help Makefile

help:
	@echo ""
	@echo "  Targets"
	@echo ""
	@echo "    bootstrap  lerna bootstrap"
	@echo "    dist       webpack all"
	@echo "    clean      Remove built targets"
	@echo "    test       Run unit tests"
	@echo "    link       link"
	@echo "    publish    publish packages"
	@echo ""
	@echo "  Variables"
	@echo ""
	@echo "    VERSION  Version of the latest git tag"

# END-EVAL

# lerna bootstrap
bootstrap:
	lerna bootstrap

# webpack all
dist:
	lerna exec -- make -B dist

# Remove built targets
clean:
	lerna exec -- make clean

# Run unit tests
.PHONY: test
test:
	lerna exec make test

# link
link:
	lerna exec -- npm link

# publish packages
publish: clean dist
	lerna publish --skip-npm --skip-git
	VERSION=`node -e "console.log(require('./lerna.json').version)"`; \
		$(MAKE) -B dist VERSION=$$VERSION; \
		git add .; \
		git commit -m ":package: Release $$VERSION"; \
		git tag v$$VERSION; \
