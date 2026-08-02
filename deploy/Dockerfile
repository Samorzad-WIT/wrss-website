# Build stage
FROM node:22.20.0-slim AS build
WORKDIR /app

RUN corepack enable

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build-time environment variables
ARG VITE_QR_LINK
ARG VITE_WINIETKI_LINK
ARG VITE_PUNKTY_LINK
ARG VITE_API_URL
ENV VITE_QR_LINK=$VITE_QR_LINK
ENV VITE_WINIETKI_LINK=$VITE_WINIETKI_LINK
ENV VITE_PUNKTY_LINK=$VITE_PUNKTY_LINK
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm build

# Production runtime stage
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

