.PHONY: all up down

SCRIPTS_DIR := scripts

all: up

up:
	@echo "Starting up..."
	@$(SCRIPTS_DIR)/up.sh

down:
	@echo "Shutting down..."
	@$(SCRIPTS_DIR)/down.sh
