# Многостадийная сборка для уменьшения размера финального образа
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM node:18-alpine
WORKDIR /app
# Копируем только собранный код из билд-стадии
COPY --from=builder /app/dist ./dist
# Копируем минимальные зависимости (если используются)
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000


CMD ["node", "dist/src/main"]
