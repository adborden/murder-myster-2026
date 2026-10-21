FROM nginxinc/nginx-unprivileged:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx document root
COPY _site/ /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

LABEL org.opencontainers.image.source="https://github.com/adborden/murder-mystery-2026"
