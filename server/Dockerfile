FROM node:22.20.0-slim
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY index.js ./

EXPOSE 3000
CMD ["node", "index.js"]
