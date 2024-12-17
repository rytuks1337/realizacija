FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY server.crt /etc/nginx/ssl/server.crt
COPY server.key /etc/nginx/ssl/server.key

CMD ["nginx", "-g", "daemon off;"]