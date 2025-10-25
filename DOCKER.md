# Docker Setup for Next.js App

This directory contains Docker configuration files for containerizing your Next.js application.

## Files Overview

- `Dockerfile` - Production multi-stage build
- `Dockerfile.dev` - Development build with hot reload
- `docker-compose.yml` - Orchestration for different environments
- `.dockerignore` - Excludes unnecessary files from build context
- `nginx.conf` - Nginx reverse proxy configuration

## Quick Start

### Development Mode
```bash
# Start development server with hot reload
docker-compose --profile dev up --build

# Or run individual service
docker-compose up app-dev --build
```

### Production Mode
```bash
# Start production server
docker-compose --profile prod up --build -d

# With Nginx reverse proxy
docker-compose --profile prod-nginx up --build -d
```

## Available Profiles

- `dev` - Development environment with hot reload
- `prod` - Production environment (standalone)
- `prod-nginx` - Production with Nginx reverse proxy

## Manual Docker Commands

### Build and Run Production
```bash
# Build the image
docker build -t bs-front .

# Run the container
docker run -p 3000:3000 bs-front
```

### Build and Run Development
```bash
# Build development image
docker build -f Dockerfile.dev -t bs-front-dev .

# Run development container
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules bs-front-dev
```

## Environment Variables

You can set environment variables in the docker-compose.yml or pass them when running:

```bash
docker run -p 3000:3000 -e NODE_ENV=production bs-front
```

## SSL/HTTPS Setup

To enable HTTPS:

1. Place your SSL certificates in the `ssl/` directory:
   - `ssl/cert.pem` - SSL certificate
   - `ssl/key.pem` - Private key

2. Uncomment the HTTPS server block in `nginx.conf`

3. Run with nginx profile:
```bash
docker-compose --profile prod-nginx up --build -d
```

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process or use a different port
docker run -p 3001:3000 bs-front
```

### Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Clear Docker Cache
```bash
# Remove all containers and images
docker system prune -a

# Remove specific image
docker rmi bs-front
```

## Performance Tips

1. Use `.dockerignore` to exclude unnecessary files
2. Leverage Docker layer caching by copying package.json first
3. Use multi-stage builds to reduce final image size
4. Enable Next.js standalone output for optimal production builds

## Monitoring

The nginx configuration includes a health check endpoint:
```bash
curl http://localhost/health
```

## Scaling

To scale your application:
```bash
# Scale to 3 instances
docker-compose --profile prod up --scale app=3 -d
```
