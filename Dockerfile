FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY app ./app
COPY public ./public
COPY next.config.ts tsconfig.json ./
COPY scripts/build-pages.mjs ./scripts/build-pages.mjs
RUN npm run build:pages
FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
