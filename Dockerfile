FROM node:16.15.0-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

FROM node:16.15.0-alpine

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start"]
