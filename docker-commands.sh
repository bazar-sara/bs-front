# Build and run commands for different environments

# Development
docker-compose --profile dev up --build

# Production (standalone)
docker-compose --profile prod up --build -d

# Production with Nginx
docker-compose --profile prod-nginx up --build -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache

# Scale production app
docker-compose --profile prod up --scale app=3 -d
