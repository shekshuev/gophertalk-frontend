FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG VITE_APP_API_URL
ARG VITE_APP_DEFAULT_LOCALE
ENV VITE_APP_API_URL=$VITE_APP_API_URL
ENV VITE_APP_DEFAULT_LOCALE=$VITE_APP_DEFAULT_LOCALE

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]