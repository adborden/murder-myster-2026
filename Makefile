SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help

# Configuration variables
IMAGE_NAME ?= ghcr.io/adborden/murder-mystery-2026
IMAGE_TAG  ?= latest
IMAGE      := $(IMAGE_NAME):$(IMAGE_TAG)
PORT       ?= 8080

# Tooling
DOCKER ?= docker
NPM    ?= npm

DOCKER_BUILD_ARGS :=

.PHONY: help install dev preview test type-check lint build clean docker-build docker-run docker-stop docker-test

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

## Local Development Commands

install: ## Install npm dependencies
	$(NPM) install

dev: ## Start Vite local development server with HMR
	$(NPM) run dev

preview: ## Preview the production static build locally
	$(NPM) run preview

## Build, Test & Validation Commands

test: ## Run unit and component tests via vitest
	$(NPM) test

type-check: ## Run TypeScript type checks
	npx vue-tsc -b

lint: ## Alias for type-check
	npx vue-tsc -b

build: ## Build production static site bundle into dist/
	$(NPM) run build

clean: ## Remove build outputs and temporary files
	rm -rf dist

## Docker & Container Commands

docker-build: ## Build the multi-stage Nginx Docker container
	$(DOCKER) build -t $(IMAGE) $(DOCKER_BUILD_ARGS) .

docker-publish: DOCKER_BUILD_ARGS += --push
docker-publish: docker-build

docker-run: ## Run the container locally on PORT (default 8080)
	$(DOCKER) run --rm -it -p $(PORT):8080 --name $(IMAGE_NAME) $(IMAGE)

docker-stop: ## Stop the locally running Docker container
	$(DOCKER) stop $(IMAGE_NAME) 2>/dev/null || true

docker-test: ## Verify running container health check endpoint
	curl -f -i http://localhost:$(PORT)/healthz
