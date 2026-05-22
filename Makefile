SHELL := /usr/bin/env bash

.PHONY: help dev build start lint typecheck validate doctor check manifest

help:
	@echo "Terminal Portfolio commands"
	@echo
	@echo "  make dev          Start the local dev server"
	@echo "  make build        Build for production"
	@echo "  make lint         Run ESLint"
	@echo "  make typecheck    Run TypeScript checks"
	@echo "  make validate     Validate project/blog content"
	@echo "  make doctor       Check local repo setup"
	@echo "  make check        Run lint, typecheck, validate, and build"
	@echo "  make manifest     Regenerate content manifest"

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint -- --max-warnings=0

typecheck:
	npm run typecheck

validate:
	npm run validate:content

doctor:
	npm run doctor

check:
	npm run check

manifest:
	npm run generate:manifest
