#!/bin/bash
cd /var/www/portfolio-krainet
git pull origin main
bun install
bun run deploy

