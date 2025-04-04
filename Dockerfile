# Use a Node.js image to build the app
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Use corepack to manage pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Build the application
RUN pnpm i
RUN pnpm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=builder /app/apps/explorer/build /usr/share/nginx/html
COPY --from=builder /app/docker-entrypoint.sh /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Some magic is happening in the entrypoint script, where we propagate
# environment variables to the web application directly.
# This is necessary to make the web application aware of the environment
# variables set while running the container.
#
# Check docker-entrypoint.sh for details, which is a modified version
# of the standard Nginx entrypoint script.
CMD ["nginx", "-g", "daemon off;"]
