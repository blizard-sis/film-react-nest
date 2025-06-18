###
# 1-я стадия: builder
###
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .
ARG VITE_API_URL="//localhost/api"
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

###
# 2-я стадия: static-nginx
###
FROM nginx:alpine AS runtime

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
