FROM node:8.3.0
EXPOSE 80
COPY . ./var/www
ENV PORT 80
ENV NODE_ENV=production
CMD cd /var/www && node bin/www
