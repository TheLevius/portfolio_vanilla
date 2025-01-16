#!/bin/bash
cd /var/www/portfolio-krainet
git pull origin main
bun install
tmux new-session -d -s deploy_session "bun run deploy"
