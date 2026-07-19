FROM node:22.20.0-slim AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_QR_LINK
ARG VITE_WINIETKI_LINK
ARG VITE_PUNKTY_LINK
ENV VITE_QR_LINK=$VITE_QR_LINK
ENV VITE_WINIETKI_LINK=$VITE_WINIETKI_LINK
ENV VITE_PUNKTY_LINK=$VITE_PUNKTY_LINK

RUN pnpm build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
